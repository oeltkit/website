/**
 * Generated-course examples (the dogfood artifacts from toolkit Phase 1).
 *
 * Launches empty per the honesty constraints: this page only ever shows real
 * generated output. Add entries here as the toolkit produces them — the page
 * renders cards automatically.
 */

export interface ExampleCourse {
  title: string;
  /** The original prompt that produced the course, verbatim. */
  prompt: string;
  /** Path or URL to the live preview. */
  previewUrl: string;
  /** Download URLs per packaging target. */
  downloads: { label: string; url: string }[];
}

export const examples: ExampleCourse[] = [];
