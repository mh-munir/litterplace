const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
const compressedDir = path.join(__dirname, 'public', 'images', 'compressed');

// Create compressed directory if it doesn't exist
if (!fs.existsSync(compressedDir)) {
  fs.mkdirSync(compressedDir, { recursive: true });
}

async function compressImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();

  try {
    // Get image info first
    const metadata = await sharp(inputPath).metadata();

    // If image is very large, resize it first
    if (metadata.width > 2000 || metadata.height > 2000) {
      console.log(`${path.basename(inputPath)}: Large image detected (${metadata.width}x${metadata.height}), resizing...`);

      let resizeOptions = {};
      if (metadata.width > metadata.height) {
        resizeOptions = { width: 2000 };
      } else {
        resizeOptions = { height: 2000 };
      }

      await sharp(inputPath)
        .resize(resizeOptions)
        .jpeg({
          quality: 80,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(inputPath)
        .jpeg({
          quality: 80,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);
    } else if (ext === '.png') {
      await sharp(inputPath)
        .png({
          quality: 80,
          compressionLevel: 9,
          palette: true
        })
        .toFile(outputPath);
    } else {
      // For other formats, just copy
      fs.copyFileSync(inputPath, outputPath);
    }

    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const savings = originalSize > compressedSize ?
      ((originalSize - compressedSize) / originalSize * 100).toFixed(2) :
      `+${((compressedSize - originalSize) / originalSize * 100).toFixed(2)}`;

    console.log(`${path.basename(inputPath)}: ${originalSize} → ${compressedSize} bytes (${savings}% ${originalSize > compressedSize ? 'savings' : 'increase'})`);
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error.message);
    // If compression fails, copy the original
    try {
      fs.copyFileSync(inputPath, outputPath);
      console.log(`${path.basename(inputPath)}: copied (compression failed)`);
    } catch (copyError) {
      console.error(`Failed to copy ${inputPath}:`, copyError.message);
    }
  }
}

async function compressAllImages() {
  const files = fs.readdirSync(imagesDir);

  console.log('Starting image compression...\n');

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      const inputPath = path.join(imagesDir, file);
      const outputPath = path.join(compressedDir, file);

      await compressImage(inputPath, outputPath);
    }
  }

  console.log('\n✅ Image compression completed!');
  console.log(`Compressed images saved to: ${compressedDir}`);
  console.log('You can now replace the original images with the compressed versions.');
}

compressAllImages().catch(console.error);