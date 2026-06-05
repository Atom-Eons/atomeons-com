type CourseInstance = {
  /** schema.org CourseInstance.courseMode — e.g. "online", "onsite", "blended" */
  courseMode?: "online" | "onsite" | "blended";
  /** ISO 8601 duration, e.g. "PT2H30M" or "P4W" */
  courseWorkload?: string;
  /** ISO 8601 date the instance starts */
  startDate?: string;
  /** ISO 8601 date the instance ends */
  endDate?: string;
  /** Location URL for online instances */
  location?: string;
  /** Instructor name */
  instructor?: string;
};

type Provider = {
  /** Provider organization name */
  name: string;
  /** Provider canonical URL */
  url: string;
  /** Optional Wikipedia / social links to strengthen entity disambiguation */
  sameAs?: string[];
};

type Props = {
  /** Course title as it appears to learners */
  name: string;
  /** Short description of what the course teaches */
  description: string;
  /** Organization offering the course */
  provider: Provider;
  /** Required by Google Rich Results — what kind of learning resource this is */
  learningResourceType: string;
  /** BCP-47 language tag, e.g. "en", "en-US" */
  inLanguage: string;
  /** Beginner / Intermediate / Advanced, or schema.org URL */
  educationalLevel?: string;
  /** Course code as displayed in the catalog */
  courseCode?: string;
  /** One or more concrete instances of the course (sessions, cohorts) */
  hasCourseInstance?: CourseInstance[];
  /** Canonical URL for this course */
  url?: string;
  /** ISO 8601 publish date */
  datePublished?: string;
  /** ISO 8601 last-modified date */
  dateModified?: string;
};

/**
 * Emits a schema.org `Course` JSON-LD block for /learn entries.
 *
 * Targets Google's Course Rich Result requirements: `name`, `description`,
 * and `provider` are required; `hasCourseInstance` unlocks the enhanced
 * Course Info card with mode/duration/start-date. Use one component per
 * course page.
 */
export function Course({
  name,
  description,
  provider,
  learningResourceType,
  inLanguage,
  educationalLevel,
  courseCode,
  hasCourseInstance,
  url,
  datePublished,
  dateModified,
}: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    learningResourceType,
    inLanguage,
    provider: {
      "@type": "Organization",
      name: provider.name,
      url: provider.url,
      ...(provider.sameAs && provider.sameAs.length > 0
        ? { sameAs: provider.sameAs }
        : {}),
    },
  };

  if (url) data.url = url;
  if (educationalLevel) data.educationalLevel = educationalLevel;
  if (courseCode) data.courseCode = courseCode;
  if (datePublished) data.datePublished = datePublished;
  if (dateModified) data.dateModified = dateModified;

  if (hasCourseInstance && hasCourseInstance.length > 0) {
    data.hasCourseInstance = hasCourseInstance.map((instance) => {
      const node: Record<string, unknown> = { "@type": "CourseInstance" };
      if (instance.courseMode) node.courseMode = instance.courseMode;
      if (instance.courseWorkload) node.courseWorkload = instance.courseWorkload;
      if (instance.startDate) node.startDate = instance.startDate;
      if (instance.endDate) node.endDate = instance.endDate;
      if (instance.location) {
        node.location = {
          "@type": "VirtualLocation",
          url: instance.location,
        };
      }
      if (instance.instructor) {
        node.instructor = {
          "@type": "Person",
          name: instance.instructor,
        };
      }
      return node;
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}