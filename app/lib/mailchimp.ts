// /lib/mailchimp.ts

export type MailchimpTag = { name: string; status: "active" | "inactive" };

export function mapTags(answers: any): MailchimpTag[] {
  const tags: MailchimpTag[] = [];

  const map: Record<string, Record<string, string>> = {
    q1: {
      "1": "cat_count_1",
      "2-3": "cat_count_2to3",
      "4+": "cat_count_4plus",
    },

    q2: {
      smell: "problem_smell",
      tracking: "problem_tracking",
      scooping: "problem_scooping",
      space: "problem_space",
    },

    q3: {
      apartment: "space_apartment",
      house: "space_house",
      hidden: "space_hidden",
    },

    q4: {
      under50: "budget_under50",
      "50to150": "budget_50to150",
      "150to400": "budget_150to400",
      "400plus": "budget_400plus",
    },

    q5: {
      senior: "cat_senior",
      large: "cat_large",
      anxious: "cat_anxious",
      normal: "cat_normal",
    },

    source: {
      "odor": "page_odor",
      "automatic": "page_automatic",
      "multiplecats": "page_multiplecats",
      "apartment": "page_apartment",
      "hidden": "page_hidden",
      "tracking": "page_tracking",
    },
  };

    const normalize = (value: unknown) =>
    String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-+]+/g, "");

  Object.keys(map).forEach((q) => {
    const rawValue = answers?.[q];
    if (rawValue == null) return;

    const normalized = normalize(rawValue);
    const selectedKey = Object.keys(map[q]).find((k) => normalize(k) === normalized);

    // Only update tags when we can confidently match a submitted answer.
    if (!selectedKey) return;

    Object.entries(map[q]).forEach(([optionKey, tagName]) => {
      tags.push({
        name: tagName,
        status: optionKey === selectedKey ? "active" : "inactive",
      });
    });
  });

  return tags;
}