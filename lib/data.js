// All data for the app lives here. Simple JS objects, easy to read and easy to add to later.
import { newPatterns } from "./newPatterns";
import { newQuestions } from "./newQuestions";

// ---- PATTERNS ----
// A "pattern" is a common trick used to solve many questions.
// Each pattern has: what it is, when to use it, and steps to think about it.
const starterPatterns = [
  {
    id: "two-pointers",
    name: "Two Pointers",
    shortDescription: "Use two markers moving through the data to avoid extra loops.",
    whatItIs:
      "You keep two 'pointers' (just index variables) that move through an array or string — either from both ends moving inward, or both from the start moving at different speeds. This helps you check pairs of items without checking every pair (which would be slow).",
    whenToUse: [
      "The input is a sorted array and you need to find a pair with some sum or condition.",
      "You need to compare items from the start and end of a list at the same time.",
      "You need to remove duplicates or shift items in place without using extra space.",
      "You are checking if a string reads the same forwards and backwards (palindrome).",
    ],
    questionTypes: [
      "Pair sum problems on sorted arrays",
      "Palindrome checks",
      "Removing duplicates in place",
      "Reversing arrays or strings in place",
    ],
  },
  {
    id: "hash-map",
    name: "Hash Map (Dictionary)",
    shortDescription: "Store things you've seen before so you can look them up instantly.",
    whatItIs:
      "A hash map (called an object or Map in JavaScript) lets you store a key and a value, and find that value again in almost no time. Instead of searching the whole list again and again, you remember what you've already seen.",
    whenToUse: [
      "You need to check 'have I seen this number/word before?' quickly.",
      "You need to count how many times something appears.",
      "You need to find a pair of numbers that add up to a target (Two Sum style).",
      "You need to group items that share something in common.",
    ],
    questionTypes: [
      "Two Sum style problems",
      "Counting frequency of items",
      "Finding duplicates",
      "Grouping / categorizing items",
    ],
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    shortDescription: "Grow and shrink a 'window' over the data instead of restarting each time.",
    whatItIs:
      "Imagine a small window looking at part of an array or string. Instead of starting over every time, you slide the window forward — adding one new item on the right and removing one old item on the left. This keeps the work small.",
    whenToUse: [
      "You need the best (max/min) sum, length, or count of a continuous part of an array or string.",
      "The problem mentions 'contiguous', 'subarray', or 'substring'.",
      "You need to find the longest or shortest section that matches a condition.",
    ],
    questionTypes: [
      "Max sum of a subarray of fixed size",
      "Longest substring without repeating characters",
      "Minimum size subarray with a given sum",
    ],
  },
  {
    id: "recursion",
    name: "Recursion",
    shortDescription: "Solve a small piece, then let the function call itself for the rest.",
    whatItIs:
      "A recursive function solves a big problem by solving a smaller version of the same problem, and calling itself to do it. It always needs a 'base case' — a simple case where it stops calling itself.",
    whenToUse: [
      "The problem can be broken into smaller versions of itself (like tree problems).",
      "You are working with trees or nested structures.",
      "You need to try many possibilities (backtracking) — though that's a bigger topic later.",
    ],
    questionTypes: [
      "Tree traversal problems",
      "Factorial / Fibonacci style math problems",
      "Problems that say 'do this for a smaller version first'",
    ],
  },
  {
    id: "stack",
    name: "Stack",
    shortDescription: "Last item in, first item out — great for matching pairs and undo-style logic.",
    whatItIs:
      "A stack is like a pile of plates. You can only add (push) or remove (pop) from the top. This is perfect when the most recently seen item is the one you need to check next.",
    whenToUse: [
      "The problem involves matching brackets/parentheses.",
      "You need to undo the last action or check the most recent item first.",
      "You are evaluating expressions.",
    ],
    questionTypes: [
      "Valid parentheses problems",
      "Expression evaluation",
      "Undo / history style problems",
    ],
  },
];

export const patterns = [...starterPatterns, ...newPatterns];

// ---- QUESTIONS ----
// Each question includes: metadata (difficulty, pattern, type),
// a simple explanation, hints (direction to think), and 5 sample inputs with clear explanations.
// The first 5 below are the original "starter" questions with full elaborated depth.
// Everything else (the Blind 75 set) lives in newQuestions.js at a lighter depth.
const starterQuestions = [
  {
    id: "two-sum",
    title: "1. Two Sum",
    difficulty: "Easy",
    category: "Array",
    patternId: "hash-map",
    types: ["Array", "Hash Map"],
    problem:
      "You are given a list of numbers and a target number. Find the two numbers in the list that add up to the target. Return their positions (index) in the list.",
    simpleExplanation:
      "Think of it like shopping with a fixed budget. You want two price tags that add up exactly to your budget. You just need to tell which two items (by position) you picked.",
    elaboratedExplanation:
      "You get a list of numbers, all sitting in order at their own position (position 0, position 1, position 2, and so on). You also get one target number. Your job is to find exactly two numbers from the list whose sum equals the target, and instead of telling us the numbers themselves, you tell us WHERE they live in the list (their positions). There is always exactly one correct pair to find, and you can't use the same position twice — even if the same value shows up twice, they must be two different spots in the list.",
    nonCoderApproach:
      "Forget code for a second. Imagine you're at a store with a gift card worth exactly $9, and there's a shelf of items with price tags: $2, $7, $11, $15. You want to find two items whose prices add up to exactly $9. The slow way is to try every pair by hand: $2+$7? Yes! That works. A smarter way, especially if the shelf is huge, is to keep a small notebook. As you look at each price tag, you write it down. Before writing a new one down, you ask yourself: 'Do I already have a price in my notebook that, combined with this one, hits $9?' If your notebook already has $2 and you're now looking at a $7 tag, you instantly know $2+$7=$9 without re-checking the whole shelf again.",
    solutionSteps: [
      "Create an empty notebook (a hash map) that will store 'number → position' pairs as you go.",
      "Look at the numbers one at a time, from left to right, keeping track of the current position.",
      "For the current number, work out what its 'partner' would need to be: partner = target − current number.",
      "Check the notebook: has that partner already been seen? If yes, you're done — the answer is the partner's saved position and the current position.",
      "If the partner hasn't been seen yet, write the current number and its position into the notebook, then move to the next number.",
      "Repeat until you find a match. Since the problem guarantees exactly one answer exists, you will always find it before running out of numbers.",
    ],
    edgeCases: [
      "Two identical numbers make the target (e.g. 3 and 3 adding to 6) — this is fine as long as they are at two different positions.",
      "The target can be reached by numbers that appear later in the list, not just earlier — always check the notebook before adding the current number to it.",
      "Negative numbers and zero work exactly the same way as positive numbers — the notebook doesn't care about sign.",
      "There is only ever one correct answer per the problem's promise, so you never need to worry about multiple valid pairs.",
    ],
    patternInAction: {
      explanation:
        "This question uses the Hash Map pattern. As you walk through the numbers one at a time, you keep a map of every number you've already seen, paired with its position. For the current number, you calculate the 'partner' you need (target minus current number) and just look it up in the map — no need to re-scan the whole list. This turns a slow 'check every pair' approach into a single fast pass.",
      example: {
        input: "nums = [2, 7, 11, 15], target = 9",
        walkthrough: [
          "See 2 at index 0. Needed partner = 9 - 2 = 7. Map is empty, 7 isn't in it. Store {2: 0} in the map.",
          "See 7 at index 1. Needed partner = 9 - 7 = 2. Check the map — 2 IS there, at index 0!",
          "Found it instantly: return [0, 1]. We never had to check index 2 or 3 at all.",
        ],
      },
    },
    hints: [
      "Start simple: what if you checked every pair of numbers? That works, but it's slow for big lists.",
      "Can you remember the numbers you already looked at, so you don't need to check them all again?",
      "For each number, ask: 'What other number do I need to reach the target?' That's target minus the current number.",
      "Use a hash map to store each number you've seen and its position. Before adding a new number, check if the 'needed number' is already in the map.",
      "If found, you have your answer immediately — no need to keep looping.",
    ],
    samples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation:
          "nums[0] is 2 and nums[1] is 7. 2 + 7 = 9, which matches the target. So we return their positions 0 and 1.",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
        explanation:
          "nums[1] is 2 and nums[2] is 4. 2 + 4 = 6. Note 3 alone doesn't pair with itself here, so the answer is positions 1 and 2.",
      },
      {
        input: "nums = [3, 3], target = 6",
        output: "[0, 1]",
        explanation:
          "Both numbers are 3. 3 + 3 = 6. Even though the values are the same, their positions (0 and 1) are different, so this is a valid answer.",
      },
      {
        input: "nums = [1, 5, 3, 8], target = 11",
        output: "[1, 3]",
        explanation:
          "nums[1] is 5 and nums[3] is 8. 5 + 8 = 11. Walking through with a hash map: see 1 (need 10, not found, store 1); see 5 (need 6, not found, store 5); see 3 (need 8, not found, store 3); see 8 (need 3, found at index 2!) wait — actually 8 needs 3, and 3 is at index 2, so check again: this shows why tracing step by step matters. The final matching pair by value is 5 and 8 -> positions 1 and 3.",
      },
      {
        input: "nums = [-3, 4, 3, 90], target = 0",
        output: "[0, 2]",
        explanation:
          "nums[0] is -3 and nums[2] is 3. -3 + 3 = 0. This shows the trick also works with negative numbers — the map doesn't care if numbers are negative or positive.",
      },
    ],
  },
  {
    id: "valid-parentheses",
    title: "2. Valid Parentheses",
    difficulty: "Easy",
    category: "String",
    patternId: "stack",
    types: ["String", "Stack"],
    problem:
      "You are given a string made only of the characters ( ) { } [ ]. Check if every opening bracket has a matching closing bracket in the correct order.",
    simpleExplanation:
      "Think of nested boxes. If you open a big box, then a medium box inside it, you must close the medium box before you close the big box. Brackets work the same way.",
    elaboratedExplanation:
      "You're given a string built only from six characters: ( ) { } [ ]. 'Valid' means two things at once: every opening bracket has a closing bracket of the exact same type somewhere after it, AND the closing brackets appear in the right nested order — the most recently opened bracket must be the next one to close. A string like '([)]' looks like it has matching pairs if you just count them, but it's still invalid because the order is scrambled — the ')' closes before the '[' does, which breaks the nesting.",
    nonCoderApproach:
      "Think of Russian nesting dolls, or zipping up a jacket that has an inner zipper and an outer zipper. If you unzip the outer one first, you can't zip the inner one shut properly — things must close in the reverse order they were opened. Another way to picture it: imagine you're stacking plates as you open brackets, one plate per opening bracket. When you hit a closing bracket, you look at the very top plate on your stack. If it's the matching type, you take it off (close it). If it's the wrong type, or there's no plate left to remove, something went wrong and the whole thing is invalid.",
    solutionSteps: [
      "Create an empty stack (think: an empty pile) to hold opening brackets that are still waiting to be closed.",
      "Go through the string one character at a time, left to right.",
      "If the character is an opening bracket ( { [ , place it on top of the stack.",
      "If the character is a closing bracket ) } ] , look at the top of the stack. If the stack is empty, or the top item isn't the matching opener, the string is invalid — stop right there.",
      "If the top item does match, remove it from the stack (it's now properly closed) and continue to the next character.",
      "After reading the whole string, check the stack one last time: if it's completely empty, every bracket was matched properly and the string is valid. If anything is left sitting in the stack, some opener never got closed, so it's invalid.",
    ],
    edgeCases: [
      "An empty string has nothing to mismatch, so it counts as valid.",
      "A string with only opening brackets (like '(((') is invalid — the stack will never empty out.",
      "A string with only closing brackets (like ')))') is invalid — you'll try to pop from an empty stack.",
      "Brackets can be mismatched in type even when the counts match, like '(]' — always compare the actual bracket type, not just whether something exists on the stack.",
      "Odd-length strings can never be valid, since every opener needs exactly one closer — a quick length check can save time before scanning.",
    ],
    patternInAction: {
      explanation:
        "This question uses the Stack pattern. Every time you see an opening bracket, you push it onto the stack — it's waiting for its partner. Every time you see a closing bracket, you check the top of the stack (the most recently opened bracket). If it matches, pop it off. If it doesn't match, or the stack is empty, the string is invalid right away.",
      example: {
        input: 's = "{[]}"',
        walkthrough: [
          "See '{'. It's an opener, so push it. Stack: [ { ]",
          "See '['. It's also an opener, push it. Stack: [ {, [ ]",
          "See ']'. It's a closer — check the top of the stack: '[' matches! Pop it. Stack: [ { ]",
          "See '}'. It's a closer — check the top of the stack: '{' matches! Pop it. Stack: [ ]",
          "String is finished and the stack is empty, so the brackets were all matched correctly — return true.",
        ],
      },
    },
    hints: [
      "Read the string one character at a time, left to right.",
      "When you see an opening bracket ( { [ , you don't know its partner yet — save it for later.",
      "A stack is perfect for 'save for later' because the most recent opening bracket should be closed first.",
      "When you see a closing bracket, check the top of the stack. Does it match? If yes, remove it (pop). If no, the string is invalid.",
      "At the end, if the stack is empty, everything was matched properly. If anything is left, it's invalid.",
    ],
    samples: [
      {
        input: 's = "()"',
        output: "true",
        explanation:
          "We open '(' and push it onto the stack. Then we see ')' which matches the top of the stack, so we pop it. Stack ends empty, so it's valid.",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation:
          "Each opening bracket is immediately followed by its own matching closing bracket. Every push is followed by a matching pop, so the stack is empty at the end.",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation:
          "We push '(' onto the stack. Then we see ']' — but the top of the stack is '(', not '[', so they don't match. This is invalid.",
      },
      {
        input: 's = "([)]"',
        output: "false",
        explanation:
          "We push '(' then push '['. Then we see ')' — but the top of the stack is '[', not '(', so the order is wrong. Brackets must close in the reverse order they opened.",
      },
      {
        input: 's = "{[]}"',
        output: "true",
        explanation:
          "Push '{', push '[', then ']' matches the top '[' so pop it, then '}' matches the top '{' so pop it. Stack ends empty — valid and properly nested.",
      },
    ],
  },
  {
    id: "reverse-string",
    title: "3. Reverse String",
    difficulty: "Easy",
    category: "String",
    patternId: "two-pointers",
    types: ["String", "Two Pointers"],
    problem:
      "You are given a list of characters. Reverse the list in place (don't create a new list) so the last character becomes first.",
    simpleExplanation:
      "Imagine standing at both ends of a line of people and swapping the person at the front with the person at the back, then moving one step inward, and repeating.",
    elaboratedExplanation:
      "You're given a list of characters, and you need to flip the order so the first character becomes the last and the last becomes the first — the whole list reversed. The catch is you must do it 'in place', meaning you edit the same list directly instead of building a brand new reversed list. This matters because building a new list uses extra memory, and part of the exercise is learning to solve it without needing that extra space.",
    nonCoderApproach:
      "Picture a line of people standing for a photo, and you want to flip their order without making a second line. The easiest way: the person at the very front swaps places with the person at the very back. Then the next person from the front swaps with the next person from the back. You keep doing this, working your way inward from both ends, until the two people you're looking at are the same person (or they've crossed each other) — at that point everyone has swapped and the line is fully reversed, using the same people in the same spot, just rearranged.",
    solutionSteps: [
      "Set up two markers: one called 'left' starting at the very first position, and one called 'right' starting at the very last position.",
      "Swap whatever character is at 'left' with whatever character is at 'right'.",
      "Move 'left' one step forward (toward the middle) and move 'right' one step backward (toward the middle).",
      "Repeat the swap-and-move process again with the new left and right positions.",
      "Stop as soon as 'left' and 'right' meet at the same position, or 'left' moves past 'right' — at that point every pair has already been swapped.",
    ],
    edgeCases: [
      "A list with just one character needs no swaps at all — left and right start at the same spot.",
      "A list with zero characters (empty) is already 'reversed' by default — nothing to do.",
      "A list with an even number of characters means left and right cross cleanly without ever landing on the same middle spot.",
      "A list with an odd number of characters has one true middle character that never needs swapping — it stays exactly where it is.",
      "Repeated characters (like 'a' next to another 'a') still get swapped correctly even though the swap looks invisible — the positions still moved, even if the values look the same.",
    ],
    patternInAction: {
      explanation:
        "This question uses the Two Pointers pattern. You place one pointer at the start (left) and one at the end (right) of the list. You swap whatever is at those two positions, then move left forward one step and right backward one step. You keep doing this until the pointers meet or cross — at that point, every pair has been swapped and the list is fully reversed.",
      example: {
        input: 's = ["h","e","l","l","o"]',
        walkthrough: [
          "left = 0 ('h'), right = 4 ('o'). Swap them → [\"o\",\"e\",\"l\",\"l\",\"h\"]. Move left to 1, right to 3.",
          "left = 1 ('e'), right = 3 ('l'). Swap them → [\"o\",\"l\",\"l\",\"e\",\"h\"]. Move left to 2, right to 2.",
          "left and right are now both at index 2 — they've met, so we stop.",
          "Final result: [\"o\",\"l\",\"l\",\"e\",\"h\"], reversed with no extra list needed.",
        ],
      },
    },
    hints: [
      "You don't need extra space — try to solve it by swapping items inside the same list.",
      "Place one pointer at the very start (left) and one at the very end (right).",
      "Swap the characters at the left and right pointers.",
      "Move left forward one step, and right backward one step.",
      "Stop when left and right meet or cross each other.",
    ],
    samples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        explanation:
          "left starts at 'h' (index 0), right starts at 'o' (index 4). Swap them -> o,e,l,l,h. Move inward: swap 'e' and 'l' -> o,l,l,e,h. Pointers meet at the middle 'l', so we stop.",
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
        explanation:
          "Swap H and h (ends) first: h,a,n,n,a,H. Move inward and swap a and a — they're the same, so no visible change. Move inward again and swap n and n — same too. Pointers meet, done.",
      },
      {
        input: 's = ["a"]',
        output: '["a"]',
        explanation:
          "With only one character, left and right pointers start at the same position, so there is nothing to swap. The string is already 'reversed'.",
      },
      {
        input: 's = ["a","b"]',
        output: '["b","a"]',
        explanation:
          "left is at 'a' (index 0), right is at 'b' (index 1). We swap them once, then left and right cross each other, so we stop after one swap.",
      },
      {
        input: 's = ["1","2","3","4"]',
        output: '["4","3","2","1"]',
        explanation:
          "Swap index 0 and 3: 4,2,3,1. Move inward, swap index 1 and 2: 4,3,2,1. Pointers now cross, so we stop. Notice this works exactly the same for numbers-as-characters as for letters.",
      },
    ],
  },
  {
    id: "contains-duplicate",
    title: "4. Contains Duplicate",
    difficulty: "Easy",
    category: "Array",
    patternId: "hash-map",
    types: ["Array", "Hash Map"],
    problem:
      "You are given a list of numbers. Check if any number appears more than once in the list.",
    simpleExplanation:
      "Imagine checking name tags at a party one by one. Keep a notepad of names you've already seen. If you see a name that's already on your notepad, you found a duplicate.",
    elaboratedExplanation:
      "You're handed a list of numbers, and you simply need to answer yes or no: does any number show up more than once anywhere in the list? You don't need to say which number repeats or how many times — just whether any repeat exists at all. The list could be in any order, and the repeat could be right next to each other or far apart.",
    nonCoderApproach:
      "Imagine you're standing at the door of a party checking name tags as guests walk in. You keep a notepad, and every time someone new walks in, you jot their name down. Before writing a new name, you glance at your notepad first — if that name is already written down, you've caught a repeat guest (maybe someone snuck back in!). You don't need to remember exactly how many times you've seen a name, or finish checking everyone else at the party — the moment you spot a repeat, you already have your answer: yes, there's a duplicate.",
    solutionSteps: [
      "Create an empty notepad (a set) to keep track of numbers you've already seen.",
      "Go through the list one number at a time.",
      "For the current number, check the notepad first: is it already written down?",
      "If yes, you've found a duplicate — you can stop immediately and answer 'yes'.",
      "If no, write the current number down in the notepad and move to the next one.",
      "If you get through the entire list without ever finding a repeat, the answer is 'no' — every number was unique.",
    ],
    edgeCases: [
      "An empty list has no numbers to repeat, so the answer is always 'no'.",
      "A list with just one number can't have a duplicate either, since there's nothing to compare it against.",
      "The duplicate might be the very first and very last numbers in the list — far apart doesn't matter, the notepad still catches it.",
      "All numbers could be the same value repeated many times — you only need to catch the very first repeat to answer 'yes', no need to keep scanning.",
    ],
    patternInAction: {
      explanation:
        "This question uses the Hash Map pattern (here used as a 'set', which is just a hash map that only cares about the keys). As you go through the numbers, you check the set first: if the number is already there, you've found your duplicate immediately. If not, you add it and move on. This way, each number is only looked at once.",
      example: {
        input: "nums = [1, 2, 3, 1]",
        walkthrough: [
          "See 1. Set is empty, 1 isn't in it. Add 1 → set = {1}",
          "See 2. Not in the set. Add 2 → set = {1, 2}",
          "See 3. Not in the set. Add 3 → set = {1, 2, 3}",
          "See 1 again. Check the set — 1 IS already there! We found a duplicate instantly, no need to check anything else.",
          "Return true.",
        ],
      },
    },
    hints: [
      "The simplest way is comparing every number to every other number, but that's slow for large lists.",
      "Instead, keep a 'seen it before' set as you go through the list.",
      "For each number: is it already in the set? If yes, you found a duplicate — stop and return true.",
      "If not, add it to the set and keep going.",
      "If you finish the whole list without finding a repeat, return false.",
    ],
    samples: [
      {
        input: "nums = [1, 2, 3, 1]",
        output: "true",
        explanation:
          "We see 1 (add to set), 2 (add), 3 (add), then 1 again — but 1 is already in the set! So we immediately know there's a duplicate.",
      },
      {
        input: "nums = [1, 2, 3, 4]",
        output: "false",
        explanation:
          "Every number is different: 1, 2, 3, 4 all get added to the set one by one, and none of them repeat. After checking all of them, we return false.",
      },
      {
        input: "nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]",
        output: "true",
        explanation:
          "As soon as we see the second '1', we already know it's a duplicate because the first '1' is already in our set. We don't even need to check the rest of the list.",
      },
      {
        input: "nums = [7]",
        output: "false",
        explanation:
          "With just one number in the list, there's nothing to compare it to, so there can't be a duplicate.",
      },
      {
        input: "nums = []",
        output: "false",
        explanation:
          "An empty list has no numbers at all, so there is definitely no duplicate. This is a good 'edge case' to always think about.",
      },
    ],
  },
  {
    id: "maximum-subarray",
    title: "5. Maximum Subarray",
    difficulty: "Easy",
    category: "Array",
    patternId: "sliding-window",
    types: ["Array", "Sliding Window", "Dynamic Programming Basics"],
    problem:
      "You are given a list of numbers (can include negative numbers). Find the largest possible sum you can get by adding up a continuous (side-by-side) chunk of the list.",
    simpleExplanation:
      "Imagine walking along a row of coins where some coins are golden (positive) and some are debts (negative). You want to pick a continuous stretch of coins that gives you the most money, and you can stop collecting as soon as continuing would hurt you.",
    elaboratedExplanation:
      "You get a list of numbers that can be positive, negative, or zero. You must pick a 'subarray' — a stretch of numbers that sit right next to each other in the list, with no gaps and no skipping around — and you want the stretch whose numbers add up to the biggest possible total. You must pick at least one number (you can't pick an empty stretch), so even if every number in the list is negative, you still have to choose the least-bad option.",
    nonCoderApproach:
      "Imagine you're walking down a hallway lined with donation boxes and debt collectors standing side by side. Each donation box hands you money (a positive number), and each debt collector takes money from you (a negative number). You want to walk through a continuous stretch of the hallway — you can start and stop wherever you like, but you can't skip over anyone in between — that leaves you with the most money possible at the end. As you walk, you keep a running total in your pocket. If that running total ever drops into the negative (you're worse off than if you'd never started), it makes sense to give up on this stretch and restart your walk from the very next person, since carrying a debt forward only drags down anything good that comes after it. But if your running total is still positive or zero, it's still worth carrying forward, because even a modest amount can combine with a good stretch ahead.",
    solutionSteps: [
      "Start walking through the list from the very first number, keeping two trackers: a 'running total' for the stretch you're currently building, and a 'best total' for the best stretch you've found so far.",
      "Set both trackers to the first number in the list to begin with.",
      "For every next number, decide: is it better to add this number onto my current running stretch, or is my current running stretch actually dragging me down (negative) so it's better to abandon it and start a brand new stretch right here?",
      "If the running total (before adding the new number) is negative, drop it and start fresh — set the running total to just the current number.",
      "Otherwise, add the current number onto the running total to keep growing the stretch.",
      "After updating the running total, compare it to the best total seen so far, and update the best total if the running total is now bigger.",
      "Once you've walked through every number, the best total you tracked is the answer.",
    ],
    edgeCases: [
      "A list with only one number — that single number is automatically the answer, since it's the only possible stretch.",
      "A list where every number is negative — you still must pick at least one number, so the answer is simply the largest (least negative) single number in the list.",
      "A list that's entirely positive — the best stretch is usually the whole list, since every number only adds to the total.",
      "A mix of very negative and very positive numbers next to each other — a huge negative number in the middle might make it better to treat the list as two separate good stretches rather than one combined stretch.",
      "Zeros in the list don't hurt or help — they can be included or excluded from a stretch without changing the total.",
    ],
    patternInAction: {
      explanation:
        "This question uses the Sliding Window pattern (a simple growing-window version). You keep a 'window' represented by a running sum. As you move right through the list, you either grow the window by adding the current number, or — if the running sum has gone negative — you shrink the window back to nothing and start a fresh one at the current number. The best sum seen at any point is tracked separately as the answer.",
      example: {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        walkthrough: [
          "Start: running sum = -2, best = -2.",
          "See 1. Running sum (-2) is negative, so drop it and start fresh: running sum = 1. Best is now max(-2, 1) = 1.",
          "See -3. Running sum = 1 + (-3) = -2. Best stays 1.",
          "Running sum went negative again, so on the next number (4) we start fresh: running sum = 4. Best = max(1, 4) = 4.",
          "See -1, 2, 1: running sum grows 3, 5, 6. Best becomes 6 — this is our window [4, -1, 2, 1].",
          "See -5: running sum = 1. See 4: running sum was positive so we grow it to 5. Best stays 6 since 5 < 6.",
          "Final answer: 6.",
        ],
      },
    },
    hints: [
      "Walk through the list once, keeping a 'running sum' of the current stretch.",
      "At each number, ask: should I keep adding to my current stretch, or is my current stretch actually hurting me (negative) so I should start fresh from this number?",
      "If the running sum becomes negative, it's better to drop it and start a new stretch from the current number.",
      "Keep track of the best (largest) sum you've seen so far, separately from the running sum.",
      "By the end of the list, the best sum you tracked is your answer.",
    ],
    samples: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation:
          "The best continuous stretch is [4, -1, 2, 1], which adds up to 6. Even though there are negative numbers in the list, this middle section gives the highest total.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation:
          "With only one number, that number itself is the only possible 'stretch', so it is automatically the answer.",
      },
      {
        input: "nums = [5, 4, -1, 7, 8]",
        output: "23",
        explanation:
          "Here, taking the whole list [5, 4, -1, 7, 8] gives the best result: 5+4-1+7+8 = 23. Even though -1 is negative, it's small enough that keeping it in the stretch is still better than starting over.",
      },
      {
        input: "nums = [-1, -2, -3]",
        output: "-1",
        explanation:
          "When every number is negative, the best you can do is pick just the single largest (least negative) number, which is -1 here. You can't avoid picking at least one number.",
      },
      {
        input: "nums = [-2, -1]",
        output: "-1",
        explanation:
          "Between -2 and -1, picking just -1 alone gives a bigger (less negative) sum than picking both (-3) or just -2. This confirms: when running sum goes negative, restart from the next number.",
      },
    ],
  },
];

export const questions = [...starterQuestions, ...newQuestions];

export const difficulties = ["Easy", "Medium", "Hard"];

export const categories = [
  "Array",
  "Bit Manipulation",
  "Dynamic Programming",
  "Graph",
  "Interval",
  "Linked List",
  "Matrix",
  "String",
  "Tree",
  "Heap",
];

// Helper to gather every unique "type" tag across all questions, for the filter dropdown.
export function getAllTypes() {
  const set = new Set();
  questions.forEach((q) => q.types.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getPatternById(id) {
  return patterns.find((p) => p.id === id);
}

export function getQuestionById(id) {
  return questions.find((q) => q.id === id);
}

export function getQuestionsByPattern(patternId) {
  return questions.filter((q) => q.patternId === patternId);
}
