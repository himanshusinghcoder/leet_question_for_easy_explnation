// Extra patterns added when the Blind 75 list was imported.
// Same shape as the patterns in data.js — kept in a separate file just to
// keep data.js from becoming one giant wall of text.
export const newPatterns = [
  {
    id: "binary-search",
    name: "Binary Search",
    shortDescription: "Cut the search area in half every step instead of checking one by one.",
    whatItIs:
      "When your data is sorted (or has a sorted-like structure), you don't need to check every item. Look at the middle item — if it's not what you want, you instantly know which half to throw away and repeat only on the other half.",
    whenToUse: [
      "The array is sorted, or sorted with a twist (like a rotated sorted array).",
      "You need to find a value, or the smallest/largest value matching a condition, quickly.",
      "The problem hints at 'O(log n)' time or repeatedly says 'sorted array'.",
    ],
    questionTypes: [
      "Searching a sorted or rotated sorted array",
      "Finding a boundary or turning point",
      "Finding minimum/maximum under a condition",
    ],
  },
  {
    id: "backtracking",
    name: "Backtracking",
    shortDescription: "Try a choice, explore forward, and undo it if it doesn't work out.",
    whatItIs:
      "You build a solution step by step, trying one choice at a time. If a choice leads somewhere invalid or you've explored all it can offer, you 'backtrack' — undo that choice and try the next option instead. It's like exploring a maze and retracing your steps at dead ends.",
    whenToUse: [
      "The problem asks for 'all possible' combinations, subsets, or arrangements.",
      "You need to search a grid or tree of choices where some paths are dead ends.",
      "The problem mentions 'find all ways to...' or 'generate all...'.",
    ],
    questionTypes: [
      "Generating combinations or permutations",
      "Word search style grid exploration",
      "Puzzle-solving with multiple valid paths",
    ],
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    shortDescription: "Solve small versions of the problem once, and reuse those answers to build bigger ones.",
    whatItIs:
      "Many problems ask the same smaller question over and over (like 'how many ways to climb the first 3 stairs'). Instead of recalculating that answer every time, you save it the first time you solve it, and reuse it — this turns a slow, repeated brute-force search into a fast, step-by-step build-up.",
    whenToUse: [
      "The problem asks for a count, minimum, or maximum, and involves making a sequence of decisions.",
      "A brute-force solution would repeat the exact same smaller sub-problem many times.",
      "The problem can be described as 'the answer for size N depends on the answer for smaller sizes'.",
    ],
    questionTypes: [
      "Counting ways to reach a target (stairs, coin change)",
      "Longest/shortest sequence problems",
      "Decision problems with a running best value (house robber, jump game)",
    ],
  },
  {
    id: "graph-traversal",
    name: "Graph Traversal (BFS / DFS)",
    shortDescription: "Visit connected items step by step, without revisiting the same one twice.",
    whatItIs:
      "A graph (or a grid, or a tree) is made of items connected to each other. To explore it, you start somewhere and move to connected neighbors, marking each one as 'visited' so you don't loop forever. Depth-First Search (DFS) dives deep down one path before backing up; Breadth-First Search (BFS) explores everything one step away before going further.",
    whenToUse: [
      "The problem involves a grid, a network, or anything described as 'connected to' or 'neighbors of'.",
      "You need to find the shortest path, or check if something is reachable at all.",
      "The problem mentions islands, courses with prerequisites, or cloning a network.",
    ],
    questionTypes: [
      "Counting connected regions (like islands)",
      "Checking if a path or order exists (course scheduling)",
      "Shortest path or level-by-level exploration",
    ],
  },
  {
    id: "intervals",
    name: "Intervals",
    shortDescription: "Sort ranges by start time, then sweep through checking for overlaps.",
    whatItIs:
      "When you're given a bunch of start-end ranges (like meeting times), the first move is almost always to sort them by their start time. Once sorted, you can walk through them left to right and easily tell if the current range overlaps with the previous one, since anything overlapping must be nearby after sorting.",
    whenToUse: [
      "The problem gives you a list of [start, end] pairs.",
      "You need to merge overlapping ranges or find gaps between them.",
      "The problem mentions meetings, schedules, or booking conflicts.",
    ],
    questionTypes: [
      "Merging overlapping ranges",
      "Inserting a new range into existing ones",
      "Counting how many ranges overlap at once",
    ],
  },
  {
    id: "linked-list",
    name: "Linked List Techniques",
    shortDescription: "Use pointers (fast/slow, or reversing links) to move through a chain of nodes.",
    whatItIs:
      "A linked list is a chain of nodes where each one only knows the next one (no direct index access, unlike arrays). Common tricks are: a 'fast' and 'slow' pointer moving at different speeds to find the middle or detect a loop, or carefully rewiring the 'next' pointers to reverse or reorder the chain.",
    whenToUse: [
      "The input is described as a linked list, or you're rearranging/reversing a chain of nodes.",
      "You need to detect a cycle, or find the middle of the list, in one pass.",
      "You're merging two or more sorted chains together.",
    ],
    questionTypes: [
      "Reversing or reordering a linked list",
      "Detecting cycles",
      "Merging sorted lists",
    ],
  },
  {
    id: "matrix-traversal",
    name: "Matrix Traversal",
    shortDescription: "Move through rows and columns of a grid in a specific, careful order.",
    whatItIs:
      "A matrix is a grid of rows and columns. Many matrix problems just need you to visit cells in a particular order (like spiraling around, or going row by row) while being careful about tracking boundaries so you don't step outside the grid or revisit cells.",
    whenToUse: [
      "The input is a 2D grid or matrix.",
      "You need to rotate, traverse in a spiral, or zero-out specific rows/columns.",
      "You're searching for a path or word inside a grid of letters.",
    ],
    questionTypes: [
      "Rotating or transforming a grid in place",
      "Spiral or boundary-based traversal",
      "Searching for a path or pattern inside a grid",
    ],
  },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    shortDescription: "Work directly with the 1s and 0s that make up a number.",
    whatItIs:
      "Every number is stored as a sequence of bits (1s and 0s). Bit manipulation problems ask you to inspect, count, flip, or combine these bits directly — often using tricks like shifting bits left/right or comparing bits with AND/OR/XOR, instead of doing normal math.",
    whenToUse: [
      "The problem talks about binary representation, bits, or bitwise operators.",
      "You need to count set bits, or add numbers without using + or -.",
      "The problem hints that there's a clever trick faster than a normal loop.",
    ],
    questionTypes: [
      "Counting or flipping bits",
      "Adding numbers using only bitwise operations",
      "Finding a missing or unique number using XOR",
    ],
  },
  {
    id: "trie",
    name: "Trie (Prefix Tree)",
    shortDescription: "A tree built from letters, where each path down spells out a word or prefix.",
    whatItIs:
      "A trie is a tree where each node represents one letter, and following a path from the root spells out a word. It's built specifically to make checking 'does this prefix exist?' or 'does this exact word exist?' extremely fast, since words sharing the same beginning share the same path in the tree.",
    whenToUse: [
      "You need to repeatedly check whether words or prefixes exist in a dictionary.",
      "The problem is about autocomplete-style prefix matching.",
      "You're searching for many words at once inside a grid or list.",
    ],
    questionTypes: [
      "Implementing a prefix/word lookup structure",
      "Searching multiple words in a grid efficiently",
      "Autocomplete-style prefix problems",
    ],
  },
  {
    id: "heap",
    name: "Heap / Priority Queue",
    shortDescription: "Always keep the smallest (or largest) item within instant reach.",
    whatItIs:
      "A heap is a structure that always keeps the smallest (min-heap) or largest (max-heap) item right at the top, ready to grab instantly, even as you keep adding and removing items. It's perfect whenever you repeatedly need 'the current best/smallest/largest' without re-sorting everything each time.",
    whenToUse: [
      "You need the top K largest or smallest items from a changing collection.",
      "You're merging several sorted lists together.",
      "You need to track a running median or the current best option as data streams in.",
    ],
    questionTypes: [
      "Top K frequent or largest elements",
      "Merging multiple sorted lists efficiently",
      "Running median / streaming best-value problems",
    ],
  },
  {
    id: "greedy",
    name: "Greedy",
    shortDescription: "At each step, just take the locally best option and trust it works out.",
    whatItIs:
      "A greedy approach makes the choice that looks best right now, at every single step, without looking ahead or reconsidering earlier choices. It works great for certain problems where making the locally best choice always leads to the overall best answer — the trick is recognizing when that's actually true.",
    whenToUse: [
      "You're tracking a single running best value (like the lowest price seen so far).",
      "The problem asks whether you can 'reach the end' by making forward jumps or moves.",
      "A step-by-step 'best choice right now' strategy provably gives the correct final answer.",
    ],
    questionTypes: [
      "Buy/sell stock style running-minimum problems",
      "Reachability problems (can you get to the end?)",
      "Simple one-pass optimization problems",
    ],
  },
  {
    id: "prefix-sum",
    name: "Prefix / Suffix Products & Sums",
    shortDescription: "Precompute running totals from the left and right so any range is instant to answer.",
    whatItIs:
      "Instead of recalculating a sum or product for a range of the array every time, you build two helper lists ahead of time: one holding the running total from the left up to each position, and one from the right. Combining the two lets you answer 'what's the total everywhere except this one spot' instantly.",
    whenToUse: [
      "You need to know something about 'everything except the current item'.",
      "You'd otherwise need to repeatedly sum or multiply overlapping ranges.",
      "The problem forbids using division but still wants a product of all-other-elements.",
    ],
    questionTypes: [
      "Product/sum of array except self",
      "Range sum or range product queries",
      "Problems needing 'total on my left' and 'total on my right' separately",
    ],
  },
  {
    id: "design",
    name: "System / Data Structure Design",
    shortDescription: "Build a small custom structure or format that supports specific operations well.",
    whatItIs:
      "Some problems aren't about a single clever trick — they ask you to design a small structure or format from scratch (like a way to encode/decode strings, or a cache) that supports a set of operations efficiently. You think about what to store and how, so each required operation stays fast.",
    whenToUse: [
      "The problem asks you to 'design' or 'implement' a structure with specific methods.",
      "You need a custom encoding/decoding format for safely storing data.",
      "Multiple operations need to stay fast even as the structure grows.",
    ],
    questionTypes: [
      "Encoding and decoding data safely",
      "Building custom caches or lookup structures",
      "Designing classes with specific method requirements",
    ],
  },
];
