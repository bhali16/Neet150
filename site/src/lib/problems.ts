import { getCollection, type CollectionEntry } from 'astro:content';

export const SECTION_NAMES: Record<string, string> = {
  '01-arrays-hashing': 'Arrays & Hashing',
  '02-two-pointers': 'Two Pointers',
  '03-sliding-window': 'Sliding Window',
  '04-stack': 'Stack',
  '05-binary-search': 'Binary Search',
  '06-linked-list': 'Linked List',
  '07-trees': 'Trees',
  '08-tries': 'Tries',
  '09-heap-priority-queue': 'Heap / Priority Queue',
  '10-backtracking': 'Backtracking',
  '11-graphs': 'Graphs',
  '12-advanced-graphs': 'Advanced Graphs',
  '13-1d-dynamic-programming': '1-D Dynamic Programming',
  '14-2d-dynamic-programming': '2-D Dynamic Programming',
  '15-greedy': 'Greedy',
  '16-intervals': 'Intervals',
  '17-math-geometry': 'Math & Geometry',
  '18-bit-manipulation': 'Bit Manipulation',
};

export type ProblemEntry = CollectionEntry<'problems'>;

export interface ParsedProblem {
  entry: ProblemEntry;
  sectionSlug: string;
  sectionOrder: number;
  sectionName: string;
  fileSlug: string;
  problemOrder: number;
  title: string;
}

function titleFromBody(body: string | undefined): string {
  const match = body?.match(/^#\s*\d+\.\s*(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}

export function parseProblem(entry: ProblemEntry): ParsedProblem {
  const [sectionSlug, fileSlug] = entry.id.split('/');
  const sectionOrder = Number.parseInt(sectionSlug.slice(0, 2), 10);
  const problemOrder = Number.parseInt(fileSlug.slice(0, 2), 10);

  return {
    entry,
    sectionSlug,
    sectionOrder,
    sectionName: SECTION_NAMES[sectionSlug] ?? sectionSlug,
    fileSlug,
    problemOrder,
    title: titleFromBody(entry.body),
  };
}

export async function getAllProblems(): Promise<ParsedProblem[]> {
  const entries = await getCollection('problems');
  return entries
    .map(parseProblem)
    .sort((a, b) => a.sectionOrder - b.sectionOrder || a.problemOrder - b.problemOrder);
}

export interface SectionGroup {
  sectionSlug: string;
  sectionOrder: number;
  sectionName: string;
  problems: ParsedProblem[];
}

export async function getSections(): Promise<SectionGroup[]> {
  const problems = await getAllProblems();
  const bySlug = new Map<string, SectionGroup>();

  for (const problem of problems) {
    let group = bySlug.get(problem.sectionSlug);
    if (!group) {
      group = {
        sectionSlug: problem.sectionSlug,
        sectionOrder: problem.sectionOrder,
        sectionName: problem.sectionName,
        problems: [],
      };
      bySlug.set(problem.sectionSlug, group);
    }
    group.problems.push(problem);
  }

  return [...bySlug.values()].sort((a, b) => a.sectionOrder - b.sectionOrder);
}
