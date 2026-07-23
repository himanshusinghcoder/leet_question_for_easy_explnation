// The Blind 75 question set, added on top of the original 5 "starter" questions
// in data.js. Lighter depth than the starter 5 (no elaboratedExplanation /
// nonCoderApproach / patternInAction) — problem, simpleExplanation, hints,
// samples, and edgeCases for every question. `visual` is added for Tree and
// Linked List questions so the detail page can draw an actual diagram.
export const newQuestions = [
  // ---------------- ARRAY ----------------
  {
    id: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    patternId: "greedy",
    types: ["Array", "Greedy"],
    problem:
      "You're given a list of daily stock prices. You may buy on one day and sell on a later day. Find the maximum profit you can make. If no profit is possible, return 0.",
    simpleExplanation:
      "Buy low, sell high — but you must buy before you sell. Track the cheapest price seen so far, and check how much profit selling today would give.",
    hints: [
      "Walk through the prices once, keeping track of the lowest price seen so far.",
      "At each day, imagine selling today: profit = today's price − lowest price so far.",
      "Keep the best profit seen across all days as your answer.",
    ],
    samples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy at 1 (day 2), sell at 6 (day 5): profit = 5. That's the biggest possible profit here." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "Prices only ever go down, so no sale after a buy is ever profitable — return 0." },
      { input: "prices = [2,4,1]", output: "2", explanation: "Buy at 2, sell at 4 for profit 2. Buying at 1 happens too late to sell higher afterward." },
    ],
    edgeCases: [
      "Prices that only go downward the whole time — the answer is 0, you simply don't trade.",
      "A list with only one price — you can't buy and sell on the same day, so profit is 0.",
      "The best buy day isn't always the lowest price overall if a higher sell never follows it later — always track 'lowest so far' as you go, not the global minimum after the fact.",
    ],
  },
  {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array",
    patternId: "prefix-sum",
    types: ["Array", "Prefix Product"],
    problem:
      "Given a list of numbers, return a new list where each position holds the product of every number except the one at that position. You cannot use division.",
    simpleExplanation:
      "For each spot, multiply everything to its left together with everything to its right. Build those left-products and right-products ahead of time so it's fast.",
    hints: [
      "Build a 'prefix' list: prefix[i] = product of everything to the left of i.",
      "Build a 'suffix' list: suffix[i] = product of everything to the right of i.",
      "The answer at each position is simply prefix[i] × suffix[i].",
    ],
    samples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]", explanation: "For position 0: 2×3×4=24. For position 1: 1×3×4=12. And so on for each spot." },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]", explanation: "Since there's a 0 in the list, every position except the 0's own position becomes 0 (multiplying by 0 anywhere zeroes it out)." },
      { input: "nums = [2,3]", output: "[3,2]", explanation: "Position 0 gets everything except itself: just 3. Position 1 gets just 2." },
    ],
    edgeCases: [
      "A single zero in the list makes every result 0 except the position of the zero itself.",
      "Two or more zeros in the list make every single result 0, since every position excludes at most one zero.",
      "Negative numbers just multiply normally — track the sign like any other number.",
    ],
  },
  {
    id: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "Array",
    patternId: "dynamic-programming",
    types: ["Array", "Dynamic Programming"],
    problem:
      "Given a list of numbers, find the contiguous stretch (subarray) whose numbers multiply together to the largest possible product.",
    simpleExplanation:
      "Like Maximum Subarray, but with multiplication — which is trickier because a negative number can flip a very small (very negative) product into the biggest positive one.",
    hints: [
      "Track both the best 'max product so far' and the best 'min product so far' ending at the current position.",
      "A negative number can swap the roles of your max and min — multiplying a very negative min by another negative can produce a new max.",
      "At each step, update your answer with the new max product seen.",
    ],
    samples: [
      { input: "nums = [2,3,-2,4]", output: "6", explanation: "The subarray [2,3] gives the biggest product: 2×3=6. Including -2 or 4 afterward doesn't beat that." },
      { input: "nums = [-2,0,-1]", output: "0", explanation: "Because of the 0, no subarray spanning across it can be positive and large, so the best achievable is 0." },
      { input: "nums = [-2,3,-4]", output: "24", explanation: "Multiplying all three: -2 × 3 × -4 = 24, since the two negatives cancel out into a positive." },
    ],
    edgeCases: [
      "A single negative number in an all-positive list can ruin a straightforward max-tracking approach — you must also track the running minimum.",
      "A list with a 0 breaks any subarray into separate pieces on either side of it.",
      "A list with just one number — that number itself is the answer, positive or negative.",
    ],
  },
  {
    id: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Array",
    patternId: "binary-search",
    types: ["Array", "Binary Search"],
    problem:
      "A sorted list of unique numbers has been rotated at some unknown point (like [4,5,6,7,0,1,2]). Find the smallest number in it.",
    simpleExplanation:
      "Even after rotating, one half of the array is always still perfectly sorted. Binary search by checking which half is sorted and narrowing toward the 'break point'.",
    hints: [
      "Compare the middle element to the rightmost element — if middle > right, the minimum is somewhere to the right of middle.",
      "If middle ≤ right, the minimum is at middle or to its left.",
      "Keep narrowing the search range this way until only one element is left — that's the minimum.",
    ],
    samples: [
      { input: "nums = [3,4,5,1,2]", output: "1", explanation: "The array was rotated so the smallest value, 1, landed in the middle of the list instead of the front." },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0", explanation: "The rotation point is between 7 and 0 — 0 is the smallest value in the whole array." },
      { input: "nums = [11,13,15,17]", output: "11", explanation: "This array wasn't actually rotated (or rotated a full circle back to start), so the first element is already the minimum." },
    ],
    edgeCases: [
      "The array might not be rotated at all — the first element is already the minimum.",
      "A single-element array — that one element is trivially the minimum.",
      "The rotation point could be right at the very start or very end of the array.",
    ],
  },
  {
    id: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Array",
    patternId: "binary-search",
    types: ["Array", "Binary Search"],
    problem:
      "A sorted list of unique numbers has been rotated at an unknown point. Given a target value, return its index, or -1 if it isn't in the list.",
    simpleExplanation:
      "Same rotated-array trick as finding the minimum — at every step, figure out which half of the current range is properly sorted, then check if the target could be hiding in that sorted half.",
    hints: [
      "At each step, check if the left half (start to middle) is sorted normally.",
      "If the left half is sorted and the target falls within its range, search there — otherwise search the right half.",
      "If the left half isn't sorted, then the right half must be, so apply the same logic to it instead.",
    ],
    samples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "Scanning with rotated binary search leads us to index 4, where the value 0 sits." },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1", explanation: "3 doesn't exist anywhere in this array, so the answer is -1." },
      { input: "nums = [1], target = 0", output: "-1", explanation: "The only value in the array is 1, not 0, so it isn't found." },
    ],
    edgeCases: [
      "The target could be the pivot point itself (the smallest value in the rotated array).",
      "The array might not be rotated at all, making this behave like plain binary search.",
      "The target simply doesn't exist anywhere — must correctly return -1 rather than looping forever.",
    ],
  },
  {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Array",
    patternId: "two-pointers",
    types: ["Array", "Two Pointers"],
    problem:
      "Given a list of numbers, find all unique triplets (three numbers) that add up to zero. Each triplet should be returned only once, without duplicates.",
    simpleExplanation:
      "Sort the numbers first. Then fix one number at a time, and use two pointers on the rest of the list to find pairs that make the total add up to zero with the fixed number.",
    hints: [
      "Sort the array first — this makes both duplicate-skipping and two-pointer scanning possible.",
      "Fix one number, then use a left pointer (just after it) and a right pointer (end of array) to search for a pair summing to the negative of the fixed number.",
      "Skip over duplicate values as you go, both for the fixed number and for the two pointers, to avoid repeating the same triplet.",
    ],
    samples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "These are the only two unique groups of three numbers from the list that add up to exactly 0." },
      { input: "nums = [0,1,1]", output: "[]", explanation: "No three numbers here can add up to 0 — the smallest possible sum using these values is already positive or doesn't hit zero." },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]", explanation: "0+0+0 = 0, and even though there are three zeros, they only form one unique triplet." },
    ],
    edgeCases: [
      "Multiple duplicate values in the input must not create duplicate triplets in the output.",
      "A list shorter than 3 numbers can never form a triplet — return an empty list.",
      "All zeros, or all same-sign numbers (all positive or all negative), can never sum to zero unless zeros are involved.",
    ],
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array",
    patternId: "two-pointers",
    types: ["Array", "Two Pointers"],
    problem:
      "You're given heights of vertical lines standing at different positions. Choose two lines that, together with the ground, form a container holding the most water. Return the maximum amount of water it can hold.",
    simpleExplanation:
      "Picture walls of different heights along a number line. Water held between two walls is limited by the shorter one. Start with the widest possible pair (both ends) and move the shorter wall inward, since that's the only way to possibly do better.",
    hints: [
      "Start with two pointers at the very left and very right of the list — the widest possible container.",
      "Water held = the shorter of the two heights × the distance between them.",
      "Always move the pointer at the shorter height inward — moving the taller one can only shrink the container, never help.",
    ],
    samples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The lines at index 1 (height 8) and index 8 (height 7) form the biggest container: width 7 × height 7 = 49." },
      { input: "height = [1,1]", output: "1", explanation: "Only two lines exist, both height 1, one unit apart: 1 × 1 = 1." },
      { input: "height = [4,3,2,1,4]", output: "16", explanation: "The two end lines are both height 4, spanning a width of 4: 4 × 4 = 16, the best possible here." },
    ],
    edgeCases: [
      "All lines the same height — the widest pair (the two ends) is always best.",
      "Only two lines total — that's your only possible container.",
      "The tallest lines might be right next to each other, giving very little width — don't assume tallest lines always win.",
    ],
  },

  // ---------------- BIT MANIPULATION ----------------
  {
    id: "sum-of-two-integers",
    title: "Sum of Two Integers",
    difficulty: "Medium",
    category: "Bit Manipulation",
    patternId: "bit-manipulation",
    types: ["Bit Manipulation", "Math"],
    problem:
      "Add two integers together without using the + or - operators.",
    simpleExplanation:
      "Think of how addition works with carrying in grade school, but in binary: XOR gives you the sum without carrying, AND (shifted left) gives you the carry. Keep applying this until there's no carry left.",
    hints: [
      "XOR (a ^ b) adds two bits together but drops any carry — that's your 'sum without carry'.",
      "AND (a & b), shifted left by 1, tells you exactly where a carry was generated.",
      "Keep repeating: sum = a XOR b, carry = (a AND b) shifted left, then a = sum, b = carry — until carry becomes 0.",
    ],
    samples: [
      { input: "a = 1, b = 2", output: "3", explanation: "In binary, 1 (01) and 2 (10) have no overlapping bits, so XOR alone gives 11, which is 3 — no carry needed." },
      { input: "a = 2, b = 3", output: "5", explanation: "2 (10) and 3 (11) overlap on one bit, producing a carry that gets folded in over a couple of rounds, landing on 5." },
      { input: "a = -1, b = 1", output: "0", explanation: "Adding -1 and 1 should cancel out to 0, and the bitwise carry process resolves cleanly to exactly that." },
    ],
    edgeCases: [
      "Negative numbers are stored in two's complement form — the same XOR/AND/shift trick still works correctly on them.",
      "Adding zero to any number should return that number unchanged.",
      "The process must eventually stop — it does, once the carry becomes exactly 0.",
    ],
  },
  {
    id: "number-of-1-bits",
    title: "Number of 1 Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    patternId: "bit-manipulation",
    types: ["Bit Manipulation"],
    problem:
      "Given a positive integer, count how many bits in its binary form are set to 1.",
    simpleExplanation:
      "Repeatedly check the last bit of the number (is it 1 or 0?), count it if it's 1, then shift the whole number right by one bit and repeat.",
    hints: [
      "Use n & 1 to check whether the current last bit is a 1.",
      "Shift n right by one bit (n >>> 1) to move to the next bit.",
      "Keep a running count, and repeat until n becomes 0.",
    ],
    samples: [
      { input: "n = 11 (binary 1011)", output: "3", explanation: "The binary form 1011 has three 1-bits: positions for 8, 2, and 1 (8+2+1=11)." },
      { input: "n = 128 (binary 10000000)", output: "1", explanation: "128 is a single bit turned on far to the left — only one 1-bit total." },
      { input: "n = 0", output: "0", explanation: "Zero has no bits turned on at all." },
    ],
    edgeCases: [
      "Zero has no 1-bits — the loop should correctly return 0 immediately.",
      "A number that's a power of two (like 128) always has exactly one 1-bit.",
      "Very large numbers still work the same way — the loop simply runs a few more times.",
    ],
  },
  {
    id: "counting-bits",
    title: "Counting Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    patternId: "dynamic-programming",
    types: ["Bit Manipulation", "Dynamic Programming"],
    problem:
      "Given a number n, return a list where each position i (from 0 to n) holds the count of 1-bits in the binary form of i.",
    simpleExplanation:
      "Instead of counting bits from scratch for every number, reuse the answer for a smaller number you already solved: the bit count of i equals the bit count of i with its last bit removed, plus 1 if that last bit was a 1.",
    hints: [
      "Build the answer list from 0 upward, reusing earlier answers.",
      "The count for i equals the count for (i divided by 2, rounding down) plus (1 if i is odd, else 0).",
      "This means count[i] = count[i >> 1] + (i & 1).",
    ],
    samples: [
      { input: "n = 2", output: "[0,1,1]", explanation: "0 has zero 1-bits, 1 (binary 1) has one, 2 (binary 10) has one." },
      { input: "n = 5", output: "[0,1,1,2,1,2]", explanation: "Going through 0 to 5 in binary: 0,1,10,11,100,101 — with 0,1,1,2,1,2 ones respectively." },
      { input: "n = 0", output: "[0]", explanation: "Only the number 0 itself, which has zero 1-bits." },
    ],
    edgeCases: [
      "n = 0 should still produce a valid one-item list: [0].",
      "Powers of two (2, 4, 8, ...) always have exactly one 1-bit.",
      "Reusing previous answers only works if you build the list in increasing order from 0 upward.",
    ],
  },
  {
    id: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    patternId: "bit-manipulation",
    types: ["Array", "Bit Manipulation"],
    problem:
      "You're given n distinct numbers taken from the range 0 to n (inclusive), with exactly one number missing. Find the missing number.",
    simpleExplanation:
      "If you XOR every index together with every number in the list, all the matching pairs cancel out to zero, leaving only the missing number behind.",
    hints: [
      "XOR-ing a number with itself always gives 0, and XOR-ing with 0 leaves a number unchanged.",
      "XOR together every number from 0 to n, and also every number actually in the list.",
      "Whatever number doesn't have a matching pair to cancel out is the missing one.",
    ],
    samples: [
      { input: "nums = [3,0,1]", output: "2", explanation: "Numbers 0 to 3 should all appear, but only 0, 1, and 3 are present — 2 is missing." },
      { input: "nums = [0,1]", output: "2", explanation: "The range should be 0 to 2, but only 0 and 1 are given, so 2 is the missing number." },
      { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8", explanation: "The full range 0 to 9 should be present, but 8 never shows up in the list." },
    ],
    edgeCases: [
      "The missing number could be 0 itself, at the very start of the range.",
      "The missing number could be n itself, the very last number in the range.",
      "A list with just one number (n=1) — the missing value is whichever of 0 or 1 isn't present.",
    ],
  },
  {
    id: "reverse-bits",
    title: "Reverse Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    patternId: "bit-manipulation",
    types: ["Bit Manipulation"],
    problem:
      "Given a 32-bit unsigned integer, reverse the order of its bits and return the resulting number.",
    simpleExplanation:
      "Read the bits from right to left, and build a brand new number by placing each one into the mirrored position from left to right.",
    hints: [
      "Go through all 32 bit positions one at a time.",
      "At each step, grab the lowest bit of the input (input & 1), then shift the input right to move to the next bit.",
      "Build the result by shifting it left and adding in the grabbed bit each time — this naturally reverses the order.",
    ],
    samples: [
      { input: "n = 00000010100101000001111010011100", output: "964176192 (00111001011110000010100101000000)", explanation: "Reading the original bits from right to left and rebuilding them left to right flips the whole pattern around." },
      { input: "n = 00000000000000000000000000000001", output: "2147483648", explanation: "A single 1-bit way out on the far right moves all the way to the far left after reversing — which is the largest power of two that fits in 32 bits." },
      { input: "n = 00000000000000000000000000000000", output: "0", explanation: "A number with no bits set reverses into a number with no bits set — still 0." },
    ],
    edgeCases: [
      "All bits are 0 — the reversed result is still 0.",
      "Only the very first or very last bit is set — it simply moves to the opposite end.",
      "Since it's always exactly 32 bits, the loop always runs exactly 32 times, no more, no less.",
    ],
  },

  // ---------------- DYNAMIC PROGRAMMING ----------------
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    patternId: "dynamic-programming",
    types: ["Dynamic Programming"],
    problem:
      "You're climbing a staircase with n steps. Each move you can climb either 1 or 2 steps. Count how many distinct ways you can reach the top.",
    simpleExplanation:
      "To reach step n, your very last move was either a 1-step from step n-1, or a 2-step from step n-2. So the number of ways to reach step n is just the ways to reach n-1 plus the ways to reach n-2 — the same idea as the Fibonacci sequence.",
    hints: [
      "Think about the very last move you'd make to land exactly on step n — it's either from step n-1 or step n-2.",
      "That means ways(n) = ways(n-1) + ways(n-2).",
      "Start with the known small cases (ways(1)=1, ways(2)=2) and build upward.",
    ],
    samples: [
      { input: "n = 2", output: "2", explanation: "You can climb 1+1, or climb 2 directly — two distinct ways." },
      { input: "n = 3", output: "3", explanation: "The three ways are 1+1+1, 1+2, and 2+1." },
      { input: "n = 4", output: "5", explanation: "Following the Fibonacci-style buildup: ways(3)+ways(2) = 3+2 = 5." },
    ],
    edgeCases: [
      "n = 1 has only one way: a single 1-step.",
      "n = 0 (already at the top) is usually treated as exactly one way — doing nothing.",
      "Larger n values grow fast (like Fibonacci) — build up from small steps instead of trying every combination directly.",
    ],
  },
  {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    patternId: "dynamic-programming",
    types: ["Dynamic Programming"],
    problem:
      "You're given coin denominations and a target amount. Find the fewest number of coins needed to make that exact amount. If it's impossible, return -1.",
    simpleExplanation:
      "For every amount from 1 up to the target, work out the fewest coins needed by trying each coin type and reusing the already-solved answer for the smaller remaining amount.",
    hints: [
      "Build up an answer for every amount from 0 to the target, starting from the smallest.",
      "For each amount, try every coin: if you use that coin, the rest is (amount − coin value), whose best answer you've already solved.",
      "Take the option that uses the fewest total coins across all coin choices; if no coin combination works, mark it as impossible.",
    ],
    samples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1, using exactly 3 coins — the fewest possible." },
      { input: "coins = [2], amount = 3", output: "-1", explanation: "You can only ever make even totals with coin value 2, so 3 is impossible to reach." },
      { input: "coins = [1], amount = 0", output: "0", explanation: "You already have the target amount (0) without using any coins." },
    ],
    edgeCases: [
      "The target amount might be impossible to reach exactly with the given coins — must return -1, not a wrong number.",
      "Amount 0 always needs 0 coins.",
      "A coin exactly matching the target amount should immediately give an answer of 1.",
    ],
  },
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    patternId: "dynamic-programming",
    types: ["Dynamic Programming"],
    problem:
      "Given a list of numbers, find the length of the longest subsequence where the numbers are strictly increasing. The numbers don't have to be next to each other, just in the same left-to-right order.",
    simpleExplanation:
      "For each number, ask: what's the longest increasing run I can build ending exactly here? That depends on the best increasing runs ending at every smaller number that appears earlier and is smaller in value.",
    hints: [
      "For each position, track the length of the longest increasing subsequence that ends exactly at that position.",
      "To compute it, look at every earlier position with a smaller value, and take the best one found, plus 1.",
      "The final answer is the largest value found across all positions, not just the last one.",
    ],
    samples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "One longest increasing subsequence is [2,3,7,101] (or [2,3,7,18]), with length 4." },
      { input: "nums = [0,1,0,3,2,3]", output: "4", explanation: "The subsequence [0,1,2,3] is increasing and has length 4, even though the numbers aren't adjacent in the original list." },
      { input: "nums = [7,7,7,7]", output: "1", explanation: "Since the numbers must be strictly increasing (no repeats allowed), the best you can do is pick just one of them." },
    ],
    edgeCases: [
      "All numbers identical — the longest strictly-increasing run is just length 1.",
      "A list already fully sorted in increasing order — the whole list is the answer.",
      "A single-element list always has an answer of 1.",
    ],
  },
  {
    id: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    patternId: "dynamic-programming",
    types: ["Dynamic Programming", "String"],
    problem:
      "Given two strings, find the length of their longest subsequence that appears in both, in the same order (not necessarily touching).",
    simpleExplanation:
      "Compare the two strings letter by letter using a grid: if the current letters match, extend the best answer from the diagonal; if not, take the better answer from skipping a letter in either string.",
    hints: [
      "Build a grid where each cell represents comparing a prefix of string A with a prefix of string B.",
      "If the last letters of both prefixes match, the answer for this cell is 1 plus the answer from the cell diagonally before it.",
      "If they don't match, take the best of skipping a letter from A or skipping a letter from B.",
    ],
    samples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: 'The subsequence "ace" appears in both strings in order, giving a length of 3.' },
      { input: 'text1 = "abc", text2 = "abc"', output: "3", explanation: "The strings are identical, so the whole string is the common subsequence." },
      { input: 'text1 = "abc", text2 = "def"', output: "0", explanation: "The two strings share no letters in common at all, so the longest common subsequence is empty." },
    ],
    edgeCases: [
      "Two completely different strings with no shared letters give an answer of 0.",
      "One of the strings is empty — the answer is always 0 in that case.",
      "Identical strings give the full string length as the answer.",
    ],
  },
  {
    id: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    category: "Dynamic Programming",
    patternId: "dynamic-programming",
    types: ["Dynamic Programming", "String"],
    problem:
      "Given a string and a dictionary of words, determine whether the string can be fully broken up into a sequence of one or more dictionary words.",
    simpleExplanation:
      "Work through the string left to right, checking: 'can I reach this point using only valid dictionary words?' If the string up to some earlier point was reachable, and the piece from there to here is a dictionary word, then here is reachable too.",
    hints: [
      "Track, for every position in the string, whether it's reachable using only dictionary words so far.",
      "Position 0 (the very start) is always reachable — that's your base case.",
      "For each reachable position, check every dictionary word: if it matches the string starting right there, mark the position right after it as reachable too.",
    ],
    samples: [
      { input: 'wordDict = ["leet","code"], s = "leetcode"', output: "true", explanation: '"leetcode" splits perfectly into "leet" + "code", both valid dictionary words.' },
      { input: 'wordDict = ["apple","pen"], s = "applepenapple"', output: "true", explanation: 'The string breaks into "apple" + "pen" + "apple", reusing dictionary words as many times as needed.' },
      { input: 'wordDict = ["cats","dog","sand","and","cat"], s = "catsandog"', output: "false", explanation: "No combination of the dictionary words can be strung together to exactly form this string." },
    ],
    edgeCases: [
      "The same dictionary word may be reused multiple times within the string.",
      "An empty string is trivially considered breakable (it's already 'done').",
      "The dictionary might contain words that never actually get used — that's fine, it just means they don't apply here.",
    ],
  },
  {
    id: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Dynamic Programming",
    patternId: "backtracking",
    types: ["Backtracking", "Array"],
    problem:
      "Given a list of distinct candidate numbers and a target, find all unique combinations where the numbers add up to the target. The same number may be reused as many times as needed.",
    simpleExplanation:
      "Try adding one candidate at a time to a running combination. If the running total matches the target, save that combination. If it goes over, back up and try a different candidate.",
    hints: [
      "Try each candidate one at a time, adding it to the current combination and subtracting it from the remaining target.",
      "If the remaining target hits exactly 0, you've found a valid combination — save it.",
      "If the remaining target goes negative, back out (backtrack) and try a different candidate instead.",
    ],
    samples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]", explanation: "2+2+3=7 and 7 alone both reach the target exactly, using repeated candidates where needed." },
      { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]", explanation: "These three combinations are the only distinct ways to reach 8 using the given candidates, reused freely." },
      { input: "candidates = [2], target = 1", output: "[]", explanation: "There's no way to reach 1 using only the number 2, so no valid combination exists." },
    ],
    edgeCases: [
      "A target smaller than every candidate has no valid combination at all.",
      "The same number can be used multiple times in one combination, but combinations must still be unique overall.",
      "A candidate exactly equal to the target forms a valid one-number combination on its own.",
    ],
  },
  {
    id: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "Dynamic Programming",
    patternId: "dynamic-programming",
    types: ["Dynamic Programming"],
    problem:
      "You're robbing houses along a street, each with some amount of money. You can't rob two directly adjacent houses (it triggers an alarm). Find the maximum amount you can rob.",
    simpleExplanation:
      "At each house, you have a choice: skip it (keep your best total from before), or rob it (its value plus your best total from two houses back, since the one right before must stay unrobbed).",
    hints: [
      "At each house, decide: rob this house (add its value to the best total from two houses back), or skip it (keep the best total from the previous house).",
      "Take whichever of those two options is bigger as your new running best.",
      "The final answer is the running best after considering every house.",
    ],
    samples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (value 1) and house 3 (value 3): total = 4, and they aren't adjacent." },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob houses 1, 3, and 5 (values 2, 9, 1) for a total of 12 — the best non-adjacent combination." },
      { input: "nums = [2,1,1,2]", output: "4", explanation: "Rob the first and last house (values 2 and 2) for a total of 4." },
    ],
    edgeCases: [
      "Only one house — just rob it, no adjacency conflict possible.",
      "Two houses next to each other — you can only rob the more valuable one of the two.",
      "All houses have the same value — robbing every other house is generally the best strategy.",
    ],
  },
  {
    id: "house-robber-ii",
    title: "House Robber II",
    difficulty: "Medium",
    category: "Dynamic Programming",
    patternId: "dynamic-programming",
    types: ["Dynamic Programming"],
    problem:
      "Same as House Robber, but the houses are arranged in a circle — the first and last houses are now considered adjacent too. Find the maximum you can rob.",
    simpleExplanation:
      "Since the first and last houses can't both be robbed (they're now neighbors in the circle), just solve the regular House Robber problem twice: once ignoring the last house, once ignoring the first, and take the better result.",
    hints: [
      "Because it's a circle, the first and last house can never both be robbed at once.",
      "Run the regular House Robber solution on the houses excluding the last one.",
      "Run it again on the houses excluding the first one, and take whichever result is bigger.",
    ],
    samples: [
      { input: "nums = [2,3,2]", output: "3", explanation: "Robbing houses 1 and 3 isn't allowed since they're neighbors in the circle, so the best is just house 2 alone, worth 3." },
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Robbing houses 1 and 3 (values 1 and 3) is fine here since they aren't the very first and very last in the circle in a conflicting way — total 4." },
      { input: "nums = [1,2,3]", output: "3", explanation: "With three houses in a circle, all pairs are adjacent to each other in some way, so the best is picking the single highest-value house, 3." },
    ],
    edgeCases: [
      "Only one house in the circle — just rob it, no adjacency issue with only one house.",
      "Two houses in a circle — they're adjacent both ways, so only rob the better one.",
      "All houses have equal value — the two sub-solutions (excluding first, excluding last) may tie.",
    ],
  },
  {
    id: "decode-ways",
    title: "Decode Ways",
    difficulty: "Medium",
    category: "Dynamic Programming",
    patternId: "dynamic-programming",
    types: ["Dynamic Programming", "String"],
    problem:
      "A string of digits can represent a message where 'A'=1, 'B'=2, ..., 'Z'=26. Count how many different ways the given digit string can be decoded into letters.",
    simpleExplanation:
      "At each position, you can decode either a single digit (if it's 1-9) or a pair of digits (if they form 10-26) as one letter. The number of ways to decode up to a point depends on the number of ways to decode the shorter strings before it.",
    hints: [
      "At each position, check: can the single digit here be decoded on its own (must be 1-9, not 0)?",
      "Also check: can the last two digits together be decoded as one letter (must form 10-26)?",
      "Add up the ways from both valid options, since either can be a route to this position.",
    ],
    samples: [
      { input: 's = "12"', output: "2", explanation: '"12" can be decoded as "AB" (1, 2) or as "L" (12) — two valid ways.' },
      { input: 's = "226"', output: "3", explanation: '"226" can be decoded as "BZ" (2,26), "VF" (22,6), or "BBF" (2,2,6) — three total ways.' },
      { input: 's = "06"', output: "0", explanation: "A leading zero can't be decoded on its own, and 06 isn't a valid two-digit code either, so there are zero valid decodings." },
    ],
    edgeCases: [
      "A '0' can never be decoded alone — it only makes sense as the second digit of a valid pair like '10' or '20'.",
      "Digit pairs above 26 (like '27') can't be decoded together — only as two separate single digits.",
      "An empty string is typically considered to have exactly one way to decode: doing nothing.",
    ],
  },
  {
    id: "unique-paths",
    title: "Unique Paths",
    difficulty: "Medium",
    category: "Dynamic Programming",
    patternId: "dynamic-programming",
    types: ["Dynamic Programming", "Matrix"],
    problem:
      "A robot starts at the top-left of an m x n grid and can only move right or down. Count how many unique paths lead it to the bottom-right corner.",
    simpleExplanation:
      "The number of ways to reach any cell is just the ways to reach the cell above it, plus the ways to reach the cell to its left — since those are the only two directions you could have just come from.",
    hints: [
      "The very first row and first column only have exactly one way to reach each cell (straight across or straight down).",
      "For every other cell, the number of ways to reach it equals ways(cell above) + ways(cell to the left).",
      "Build this grid of answers row by row (or column by column) until you reach the bottom-right cell.",
    ],
    samples: [
      { input: "m = 3, n = 7", output: "28", explanation: "There are 28 distinct right/down paths from the top-left to the bottom-right of a 3-row, 7-column grid." },
      { input: "m = 3, n = 2", output: "3", explanation: "In a small 3x2 grid, there are exactly 3 distinct ways to travel from corner to corner using only right/down moves." },
      { input: "m = 1, n = 1", output: "1", explanation: "The start and end are the same single cell, so there's exactly one 'path' — staying put." },
    ],
    edgeCases: [
      "A grid with only 1 row or only 1 column has exactly one possible path (straight across or straight down).",
      "A 1x1 grid — start and end are the same cell, so there's exactly one trivial path.",
      "Larger grids grow the path count very quickly — building up row by row avoids recomputation.",
    ],
  },
  {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "Dynamic Programming",
    patternId: "greedy",
    types: ["Greedy", "Array"],
    problem:
      "You're given a list of numbers where each number is the maximum jump length from that position. Starting at index 0, determine if you can reach the last index.",
    simpleExplanation:
      "Keep track of the furthest position you can possibly reach so far as you walk through the list. If that furthest reachable point ever falls behind your current position, you're stuck and can't continue.",
    hints: [
      "Track the furthest index you can reach so far, starting at 0.",
      "As you walk through each index (as long as it's within reach), update the furthest reachable index using index + jump length there.",
      "If the furthest reachable index ever covers or passes the last index, you can reach the end.",
    ],
    samples: [
      { input: "nums = [2,3,1,1,4]", output: "true", explanation: "Jump 1 step from index 0 to index 1 (value 3), then 3 steps to the last index — reachable." },
      { input: "nums = [3,2,1,0,4]", output: "false", explanation: "No matter which path you take, you always get stuck at the 0 at index 3, unable to jump any further, and can never reach index 4." },
      { input: "nums = [0]", output: "true", explanation: "You're already standing on the last index (there's only one), so you've already 'reached' it." },
    ],
    edgeCases: [
      "A single-element list — you start on the last index already, so it's automatically reachable.",
      "A 0 early in the list can trap you if nothing before it could jump far enough to skip over it.",
      "All zeros except the first position — you can only ever move if the very first jump length is big enough to matter.",
    ],
  },

  // ---------------- GRAPH ----------------
  {
    id: "clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    category: "Graph",
    patternId: "graph-traversal",
    types: ["Graph", "DFS/BFS"],
    problem:
      "Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the entire graph.",
    simpleExplanation:
      "Walk through the graph (DFS or BFS), and for every node you visit, create a matching clone. Keep a lookup table from original nodes to their clones, so you never clone the same node twice and can correctly wire up connections.",
    hints: [
      "Keep a hash map from each original node to its already-created clone.",
      "When visiting a node: if it's already cloned, just reuse the clone from the map; otherwise create a new clone and store it in the map immediately.",
      "For each neighbor of the current node, recursively clone it (or reuse if already cloned) and connect it to the current clone.",
    ],
    samples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]", explanation: "Node 1 is connected to nodes 2 and 4, and so on — the clone has the exact same connection structure, just made of new node objects." },
      { input: "adjList = [[]]", output: "[[]]", explanation: "A graph with a single node and no connections clones into a single new node with no connections." },
      { input: "adjList = []", output: "[]", explanation: "An empty graph simply clones into an empty graph — nothing to do." },
    ],
    edgeCases: [
      "A graph with just one node and no edges — still needs to be cloned correctly.",
      "A node connected back to itself (a self-loop) — must not cause infinite recloning.",
      "A completely empty graph — return an empty result immediately.",
    ],
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graph",
    patternId: "graph-traversal",
    types: ["Graph", "Topological Sort"],
    problem:
      "You have a number of courses and a list of prerequisite pairs. Determine whether it's possible to finish all courses given these prerequisites (i.e., there's no circular dependency).",
    simpleExplanation:
      "This is really asking 'is there a cycle in this dependency graph?' If course A needs B, and B eventually needs A again, it's impossible — like a chicken-and-egg deadlock.",
    hints: [
      "Build a graph where each course points to the courses that depend on it (or the other way — prerequisite → course).",
      "Do a DFS from each course, tracking which courses are 'currently being visited' in the current path.",
      "If you ever revisit a course that's still 'currently being visited' in the same path, you've found a cycle — it's impossible.",
    ],
    samples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", explanation: "To take course 1 you need course 0 first — no cycle, so it's completely doable: take 0, then 1." },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false", explanation: "Course 1 needs course 0, but course 0 also needs course 1 — a circular dependency that can never be resolved." },
      { input: "numCourses = 3, prerequisites = [[1,0],[2,1]]", output: "true", explanation: "This forms a simple chain: 0 → 1 → 2, with no cycle, so all courses can be completed in that order." },
    ],
    edgeCases: [
      "No prerequisites at all — trivially possible to finish every course in any order.",
      "A course that requires itself as its own prerequisite — an immediate cycle.",
      "A long chain of dependencies with a cycle hidden deep inside it — must still be detected correctly.",
    ],
  },
  {
    id: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    category: "Graph",
    patternId: "graph-traversal",
    types: ["Graph", "Matrix", "DFS/BFS"],
    problem:
      "Given a grid of heights representing a landscape bordered by the Pacific (top/left) and Atlantic (bottom/right) oceans, find all cells where water can flow to both oceans (water flows from higher or equal height to lower or equal height).",
    simpleExplanation:
      "Instead of checking every cell's path to both oceans (slow), flow backward from the oceans inward: start at every border cell, and spread inland to any neighbor that's the same height or taller. Do this separately for each ocean, then find cells reachable from both.",
    hints: [
      "Run a search starting from every cell touching the Pacific border, spreading to neighbors that are equal or higher (reversed flow direction).",
      "Do the same separately starting from every cell touching the Atlantic border.",
      "The answer is every cell that showed up as reachable in both searches.",
    ],
    samples: [
      { input: "heights = [[1,2,2],[3,2,3],[2,4,5]]", output: "[[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]", explanation: "These cells can each reach both oceans by flowing downhill or level in some direction." },
      { input: "heights = [[1]]", output: "[[0,0]]", explanation: "A single cell touches both oceans simultaneously since it's on every border at once." },
      { input: "heights = [[2,1],[1,2]]", output: "[[0,0],[0,1],[1,0],[1,1]]", explanation: "Every cell in this tiny grid happens to be able to reach both oceans." },
    ],
    edgeCases: [
      "A 1x1 grid touches both oceans automatically, being on every border at once.",
      "Flat terrain (all equal heights) lets water flow freely in every direction.",
      "A tall peak surrounded by lower land on all sides can still flow outward toward both oceans.",
    ],
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graph",
    patternId: "graph-traversal",
    types: ["Graph", "Matrix", "DFS/BFS"],
    problem:
      "Given a grid of '1's (land) and '0's (water), count how many islands there are. An island is formed by connecting adjacent lands horizontally or vertically.",
    simpleExplanation:
      "Scan the grid; whenever you find an unvisited '1', that's a brand-new island — explore outward from it (flooding in all four directions) marking every connected land cell as visited so you don't count it again.",
    hints: [
      "Scan every cell in the grid one at a time.",
      "Whenever you find a '1' that hasn't been visited yet, increase your island count by 1, then flood-fill outward (DFS or BFS) marking every connected '1' as visited.",
      "Continue scanning the rest of the grid — already-visited land won't trigger a new island count again.",
    ],
    samples: [
      { input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: "2", explanation: "The top-left 2x2 block of land forms one connected island, and the lone '1' in the bottom-right corner forms a second, separate island." },
      { input: 'grid = [["1","0","0"],["0","1","0"],["0","0","1"]]', output: "3", explanation: "Each '1' is diagonally placed with no direct horizontal/vertical connection to the others, so each one counts as its own separate island." },
      { input: 'grid = [["0","0"],["0","0"]]', output: "0", explanation: "There's no land at all in this grid, so the island count is 0." },
    ],
    edgeCases: [
      "A grid entirely made of water — the answer is 0 islands.",
      "A grid entirely made of land — the answer is exactly 1 big connected island.",
      "Diagonally touching land cells do NOT count as connected — only up/down/left/right connections do.",
    ],
  },
  {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Graph",
    patternId: "hash-map",
    types: ["Array", "Hash Map"],
    problem:
      "Given an unsorted list of numbers, find the length of the longest run of consecutive integers (like 4,5,6,7), without needing to sort the array first.",
    simpleExplanation:
      "Put every number into a set for instant lookup. Then, only start counting a new run from numbers that are the true start of a sequence (meaning number−1 isn't in the set) — this avoids re-counting the same run over and over.",
    hints: [
      "Put every number into a hash set so you can check 'does this number exist?' instantly.",
      "For each number, only start counting a streak from it if (number − 1) is NOT in the set — that means it's the true beginning of a run.",
      "From a true start, keep checking number+1, number+2, and so on, counting how long the consecutive streak goes.",
    ],
    samples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The numbers 1, 2, 3, 4 form a consecutive run of length 4, the longest one available in this list." },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9", explanation: "The numbers 0 through 8 are all present, forming one long consecutive run of length 9." },
      { input: "nums = []", output: "0", explanation: "There are no numbers at all, so there's no run to find — the answer is 0." },
    ],
    edgeCases: [
      "An empty list has no consecutive run at all — the answer is 0.",
      "Duplicate numbers in the list shouldn't be counted twice within the same run — a set naturally handles this.",
      "The whole list could already be one giant consecutive run.",
    ],
  },
  {
    id: "alien-dictionary",
    title: "Alien Dictionary (Premium)",
    difficulty: "Hard",
    category: "Graph",
    patternId: "graph-traversal",
    types: ["Graph", "Topological Sort"],
    problem:
      "You're given a list of words from an alien language, sorted according to that language's unknown alphabet order. Determine a valid ordering of the letters in that alien alphabet.",
    simpleExplanation:
      "Compare each pair of neighboring words letter by letter — the very first place they differ tells you that one letter comes before another in the alien alphabet. Build these 'comes before' relationships into a graph, then find a valid overall order (topological sort).",
    hints: [
      "Compare each consecutive pair of words to find the first differing letter — that gives you one ordering rule (letter A comes before letter B).",
      "Build a graph of these 'comes before' rules between letters.",
      "Perform a topological sort on that graph to get one valid overall letter ordering; if a cycle exists, no valid ordering is possible.",
    ],
    samples: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"', explanation: "Comparing neighboring words letter by letter reveals the ordering rules that combine into this one valid alphabet order." },
      { input: 'words = ["z","x"]', output: '"zx"', explanation: "The very first letters already differ, immediately telling us 'z' comes before 'x' in this alien alphabet." },
      { input: 'words = ["z","x","z"]', output: '""', explanation: "This implies both 'z before x' and 'x before z' at once — a contradiction, so there's no valid ordering." },
    ],
    edgeCases: [
      "Contradictory orderings (a cycle in the letter graph) mean no valid alphabet exists — return empty.",
      "A word that is a prefix of an earlier word but appears after it (like 'abc' after 'ab') is actually invalid input.",
      "Letters that never get compared to anything still need to appear somewhere in the final valid order.",
    ],
  },
  {
    id: "graph-valid-tree",
    title: "Graph Valid Tree (Premium)",
    difficulty: "Medium",
    category: "Graph",
    patternId: "graph-traversal",
    types: ["Graph", "Union-Find"],
    problem:
      "Given n nodes and a list of undirected edges, determine whether these edges form a valid tree (fully connected, with no cycles).",
    simpleExplanation:
      "A valid tree with n nodes must have exactly n-1 edges (any more means a cycle, any fewer means it's not fully connected) and every node must be reachable from every other node.",
    hints: [
      "First, check the edge count: a valid tree with n nodes must have exactly n-1 edges — if not, stop immediately.",
      "Then check connectivity: starting from any node, a search (DFS/BFS or union-find) should be able to reach every other node.",
      "If both conditions hold — right edge count and full connectivity — it's a valid tree.",
    ],
    samples: [
      { input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", output: "true", explanation: "There are exactly 4 edges for 5 nodes (n-1), and every node connects back to node 0 — a valid tree." },
      { input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]", output: "false", explanation: "There's an extra edge forming a cycle among nodes 1, 2, and 3, so this isn't a valid tree." },
      { input: "n = 4, edges = [[0,1],[2,3]]", output: "false", explanation: "This forms two separate disconnected pieces rather than one single connected tree." },
    ],
    edgeCases: [
      "Too many or too few edges compared to n-1 immediately rules out a valid tree.",
      "Disconnected groups of nodes, even with the right edge count, are not a valid tree.",
      "A single node with zero edges is technically a valid (trivial) tree.",
    ],
  },
  {
    id: "number-of-connected-components-in-an-undirected-graph",
    title: "Number of Connected Components in an Undirected Graph (Premium)",
    difficulty: "Medium",
    category: "Graph",
    patternId: "graph-traversal",
    types: ["Graph", "Union-Find"],
    problem:
      "Given n nodes and a list of undirected edges, count how many separate connected groups (components) exist.",
    simpleExplanation:
      "Visit every node; whenever you find one you haven't explored yet, that's a brand-new group — explore everything connected to it (marking it visited) before moving to the next unvisited node.",
    hints: [
      "Keep a 'visited' marker for every node.",
      "Go through each node in order; whenever you find an unvisited one, that's a new component — increase your count and explore outward from it (DFS/BFS), marking everything reachable as visited.",
      "Continue until every node has been visited — your running count is the answer.",
    ],
    samples: [
      { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2", explanation: "Nodes 0, 1, 2 form one connected group, and nodes 3, 4 form a separate second group." },
      { input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]", output: "1", explanation: "All five nodes are chained together into a single connected component." },
      { input: "n = 3, edges = []", output: "3", explanation: "With no edges at all, every node is its own isolated component." },
    ],
    edgeCases: [
      "No edges at all — every single node is its own separate component.",
      "All nodes connected into one big group — the answer is simply 1.",
      "A node that appears in no edge at all is still its own component on its own.",
    ],
  },

  // ---------------- INTERVAL ----------------
  {
    id: "insert-interval",
    title: "Insert Interval",
    difficulty: "Medium",
    category: "Interval",
    patternId: "intervals",
    types: ["Array", "Intervals"],
    problem:
      "Given a list of non-overlapping intervals sorted by start time, and one new interval, insert the new interval and merge if necessary so the list stays sorted and non-overlapping.",
    simpleExplanation:
      "Walk through the intervals in three phases: first add every interval that ends before the new one starts (no overlap yet), then merge every interval that overlaps the new one into a single combined interval, then add every interval that starts after the new one ends.",
    hints: [
      "Add all intervals that come entirely before the new interval (no overlap) straight to the result, unchanged.",
      "Merge all intervals that overlap the new interval by expanding the new interval's start/end to cover them.",
      "Add the merged interval to the result, then add all remaining intervals that come entirely after it, unchanged.",
    ],
    samples: [
      { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]", explanation: "[2,5] overlaps with [1,3], merging them into [1,5]. [6,9] doesn't overlap, so it stays as is." },
      { input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]", output: "[[1,2],[3,10],[12,16]]", explanation: "[4,8] overlaps with [3,5], [6,7], and [8,10] all at once, merging them all into one big [3,10] interval." },
      { input: "intervals = [], newInterval = [5,7]", output: "[[5,7]]", explanation: "With no existing intervals, the new one is simply the only one in the result." },
    ],
    edgeCases: [
      "The new interval doesn't overlap with anything — it just needs to be inserted in the correct sorted position.",
      "The new interval completely swallows several existing intervals at once — they all merge into one.",
      "An empty starting list — the result is simply the new interval by itself.",
    ],
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Interval",
    patternId: "intervals",
    types: ["Array", "Intervals"],
    problem:
      "Given a list of intervals, merge all overlapping intervals and return the resulting list of non-overlapping intervals.",
    simpleExplanation:
      "Sort the intervals by their start time first. Then walk through them left to right — if the current interval overlaps with the last one you've kept, merge them into one; otherwise, just add it as a new separate interval.",
    hints: [
      "Sort all the intervals by their start value first — this makes overlapping intervals sit next to each other.",
      "Walk through the sorted intervals, keeping a 'current merged interval' as you go.",
      "If the next interval's start is within (or touching) the current merged interval's end, extend the merge; otherwise, close off the current merge and start a new one.",
    ],
    samples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "[1,3] and [2,6] overlap and merge into [1,6]. The other two intervals don't touch anything, so they stay unchanged." },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]", explanation: "These two intervals touch exactly at the boundary (4), which counts as overlapping, so they merge into [1,5]." },
      { input: "intervals = [[1,4],[2,3]]", output: "[[1,4]]", explanation: "[2,3] is completely contained within [1,4], so merging just keeps the larger interval." },
    ],
    edgeCases: [
      "Intervals that only touch at their exact boundary (like [1,4] and [4,5]) should still be merged.",
      "An interval fully contained within another shouldn't create a separate entry after merging.",
      "A list with just one interval, or no overlaps at all, returns unchanged (after sorting).",
    ],
  },
  {
    id: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    category: "Interval",
    patternId: "intervals",
    types: ["Array", "Intervals", "Greedy"],
    problem:
      "Given a list of intervals, find the minimum number of intervals you need to remove so that the rest don't overlap with each other.",
    simpleExplanation:
      "Sort intervals by their end time. Greedily keep the interval that finishes earliest whenever there's a conflict, since ending early leaves the most room for future intervals — anything that conflicts with what you're keeping needs to be removed.",
    hints: [
      "Sort the intervals by their end value, not their start value.",
      "Walk through them, keeping track of the end time of the last interval you decided to keep.",
      "If the next interval starts before that end time (overlap), you must remove it — otherwise keep it and update the tracked end time.",
    ],
    samples: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "Removing [1,3] is enough to eliminate all overlaps, leaving [1,2], [2,3], [3,4] peacefully non-overlapping." },
      { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2", explanation: "All three intervals are identical and fully overlapping, so you must remove two of them, keeping just one." },
      { input: "intervals = [[1,2],[2,3]]", output: "0", explanation: "These two intervals only touch at the boundary and don't actually overlap, so nothing needs to be removed." },
    ],
    edgeCases: [
      "Intervals that only touch at the boundary (like [1,2] and [2,3]) are not considered overlapping.",
      "All intervals identical — you need to remove all but one of them.",
      "A list with zero or one interval never needs any removals.",
    ],
  },
  {
    id: "meeting-rooms",
    title: "Meeting Rooms (Premium)",
    difficulty: "Easy",
    category: "Interval",
    patternId: "intervals",
    types: ["Array", "Intervals"],
    problem:
      "Given a list of meeting time intervals, determine if a single person could attend all of them (meaning none of the meetings overlap).",
    simpleExplanation:
      "Sort the meetings by start time, then check each pair of neighbors — if any meeting starts before the previous one has ended, they overlap and attending all of them is impossible.",
    hints: [
      "Sort all the meetings by their start time first.",
      "Walk through the sorted meetings, comparing each one's start time to the previous meeting's end time.",
      "If any meeting starts before the previous one ends, there's a conflict — return false immediately.",
    ],
    samples: [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "false", explanation: "The meeting [5,10] starts while [0,30] is still ongoing — an unavoidable conflict." },
      { input: "intervals = [[7,10],[2,4]]", output: "true", explanation: "Once sorted by start time, [2,4] finishes well before [7,10] begins — no conflicts, all attendable." },
      { input: "intervals = []", output: "true", explanation: "With no meetings scheduled at all, there's nothing to conflict with — trivially attendable." },
    ],
    edgeCases: [
      "No meetings at all — trivially true, nothing to attend.",
      "Only one meeting — always attendable on its own.",
      "Two meetings touching exactly at the boundary (one ends exactly when another starts) usually count as fine, not a conflict.",
    ],
  },
  {
    id: "meeting-rooms-ii",
    title: "Meeting Rooms II (Premium)",
    difficulty: "Medium",
    category: "Interval",
    patternId: "intervals",
    types: ["Array", "Intervals", "Heap"],
    problem:
      "Given a list of meeting time intervals, find the minimum number of meeting rooms required to hold all meetings without any conflicts.",
    simpleExplanation:
      "Track how many meetings are happening at the exact same time, at the busiest possible moment. Sort start times and end times separately, then sweep through: every new meeting starting needs a room, every meeting ending frees one up.",
    hints: [
      "Separate all the start times and all the end times into two sorted lists.",
      "Walk through both lists together, moving forward in time: whenever a meeting starts (before the next meeting ends), you need one more room; whenever a meeting ends, you free up a room.",
      "Track the maximum number of rooms in use at any single point in time — that's your answer.",
    ],
    samples: [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2", explanation: "At time 5-10, both [0,30] and [5,10] are happening at once, requiring 2 rooms at minimum." },
      { input: "intervals = [[7,10],[2,4]]", output: "1", explanation: "These two meetings never overlap in time, so a single room is enough for both, used one after the other." },
      { input: "intervals = [[1,5],[2,6],[3,7]]", output: "3", explanation: "All three meetings overlap with each other around time 3-5, requiring 3 separate rooms at that peak moment." },
    ],
    edgeCases: [
      "No meetings at all — the answer is 0 rooms needed.",
      "All meetings overlapping at the exact same time — you need as many rooms as there are meetings.",
      "Meetings that touch exactly at the boundary (one ends when another starts) can typically share a room.",
    ],
  },

  // ---------------- LINKED LIST ----------------
  {
    id: "reverse-linked-list",
    title: "Reverse a Linked List",
    difficulty: "Easy",
    category: "Linked List",
    patternId: "linked-list",
    types: ["Linked List"],
    problem:
      "Given the head of a singly linked list, reverse the list and return the new head.",
    simpleExplanation:
      "Walk through the list one node at a time, flipping each node's 'next' pointer to point backward instead of forward, using a 'previous' tracker that moves along with you.",
    hints: [
      "Keep track of three things as you go: the previous node, the current node, and the next node (saved before you break the link).",
      "For each node, point its 'next' backward to the previous node instead of forward.",
      "Move all three trackers one step forward and repeat until you run out of nodes — the last 'previous' node becomes your new head.",
    ],
    samples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "Every node's direction gets flipped, turning the chain completely backward." },
      { input: "head = [1,2]", output: "[2,1]", explanation: "With just two nodes, they simply swap which one points to which." },
      { input: "head = []", output: "[]", explanation: "An empty list reversed is still just an empty list." },
    ],
    edgeCases: [
      "An empty list (no head at all) — the reversed result is also empty.",
      "A list with just one node — reversing it changes nothing, it's already 'reversed'.",
      "You must not lose the rest of the list when flipping a pointer — always save 'next' before overwriting it.",
    ],
    visual: { type: "linkedlist", data: [1, 2, 3, 4, 5] },
  },
  {
    id: "linked-list-cycle",
    title: "Detect Cycle in a Linked List",
    difficulty: "Easy",
    category: "Linked List",
    patternId: "linked-list",
    types: ["Linked List", "Two Pointers"],
    problem:
      "Given the head of a linked list, determine whether it contains a cycle (a node's 'next' pointer eventually loops back to an earlier node).",
    simpleExplanation:
      "Use two runners moving at different speeds — a slow one moving one step at a time, and a fast one moving two steps at a time. If there's a loop, the fast runner will eventually lap the slow one and they'll meet.",
    hints: [
      "Use two pointers: a slow one moving 1 step at a time, and a fast one moving 2 steps at a time.",
      "If the fast pointer ever reaches the end (null), there's no cycle — the list just ends normally.",
      "If the slow and fast pointers ever land on the exact same node, a cycle exists.",
    ],
    samples: [
      { input: "head = [3,2,0,-4], pos = 1 (tail connects to index 1)", output: "true", explanation: "The last node connects back to the second node, forming a loop that the fast/slow pointers will eventually detect." },
      { input: "head = [1,2], pos = 0", output: "true", explanation: "The last node connects back to the very first node — a cycle exists." },
      { input: "head = [1], pos = -1 (no cycle)", output: "false", explanation: "The single node's next pointer simply points to nothing — no loop exists." },
    ],
    edgeCases: [
      "An empty list has no cycle by definition.",
      "A single node pointing to itself is technically a cycle of length 1.",
      "A very long list with a small loop near the end still gets caught by the fast/slow pointer trick — no need to track visited nodes separately.",
    ],
    visual: { type: "linkedlist", data: [3, 2, 0, -4], cycleIndex: 1 },
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    patternId: "linked-list",
    types: ["Linked List"],
    problem:
      "Given the heads of two sorted linked lists, merge them into one sorted list and return its head.",
    simpleExplanation:
      "Like merging two sorted piles of cards — always take whichever pile's top card is smaller, place it next, and move to the next card in that pile.",
    hints: [
      "Use a placeholder 'dummy' node to build the merged list, so you always have somewhere to attach the first real node.",
      "Compare the front of both lists, and attach whichever is smaller to your result, moving that list's pointer forward.",
      "Once one list runs out, just attach whatever remains of the other list directly — it's already sorted.",
    ],
    samples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "Comparing front elements at every step and always picking the smaller produces this fully merged, sorted list." },
      { input: "list1 = [], list2 = []", output: "[]", explanation: "Both lists are empty, so the merged result is also empty." },
      { input: "list1 = [], list2 = [0]", output: "[0]", explanation: "One list is empty, so the merged result is simply the other list unchanged." },
    ],
    edgeCases: [
      "One or both lists are empty — the result is just whichever list (if any) isn't empty.",
      "Duplicate values across the two lists should all be kept, in the correct sorted order.",
      "Lists of very different lengths — once the shorter one runs out, just attach the rest of the longer one directly.",
    ],
    visual: { type: "linkedlist", data: [1, 1, 2, 3, 4, 4] },
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    patternId: "heap",
    types: ["Linked List", "Heap"],
    problem:
      "Given an array of k sorted linked lists, merge them all into one single sorted linked list.",
    simpleExplanation:
      "Keep the current smallest unpicked node from each of the k lists ready in a min-heap. Repeatedly pull out the overall smallest, add it to your result, and push in whatever node came right after it from that same list.",
    hints: [
      "Put the first node of every list into a min-heap, so the smallest available value across all lists is always on top.",
      "Repeatedly pop the smallest node from the heap, attach it to your result list, and push its 'next' node (if any) back into the heap.",
      "Keep going until the heap is empty — every node has then been placed in sorted order.",
    ],
    samples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "Merging all three sorted lists together, always picking the smallest available head, produces this fully sorted combined list." },
      { input: "lists = []", output: "[]", explanation: "No lists were given at all, so the result is simply empty." },
      { input: "lists = [[]]", output: "[]", explanation: "The one list provided is itself empty, so there's nothing to merge." },
    ],
    edgeCases: [
      "An empty array of lists, or a mix that includes some empty lists — must be handled without crashing.",
      "All k lists could be of very different lengths.",
      "Many duplicate values across different lists should all appear in the final sorted output.",
    ],
    visual: { type: "linkedlist", data: [1, 1, 2, 3, 4, 4, 5, 6] },
  },
  {
    id: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End Of List",
    difficulty: "Medium",
    category: "Linked List",
    patternId: "linked-list",
    types: ["Linked List", "Two Pointers"],
    problem:
      "Given the head of a linked list, remove the n-th node counted from the end of the list, and return the head.",
    simpleExplanation:
      "Use two pointers with a gap of n nodes between them. Move both forward together — when the front pointer reaches the end, the back pointer will be sitting exactly before the node you need to remove.",
    hints: [
      "Move a 'fast' pointer n steps ahead of a 'slow' pointer first, using a dummy node before the head to simplify edge cases.",
      "Then move both pointers forward together, one step at a time, until the fast pointer reaches the very end.",
      "At that point, the slow pointer sits right before the node to remove — skip over it by relinking 'next'.",
    ],
    samples: [
      { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]", explanation: "Counting 2 from the end lands on the node with value 4 — removing it leaves this result." },
      { input: "head = [1], n = 1", output: "[]", explanation: "The only node in the list is exactly the 1st from the end, so removing it leaves an empty list." },
      { input: "head = [1,2], n = 1", output: "[1]", explanation: "The last node (value 2) is removed, leaving just the first node." },
    ],
    edgeCases: [
      "Removing the very last node in the list (n = 1).",
      "Removing the head itself, when n equals the total length of the list — a dummy node before head handles this cleanly.",
      "A list with only one node, being removed entirely — the result is an empty list.",
    ],
    visual: { type: "linkedlist", data: [1, 2, 3, 5] },
  },
  {
    id: "reorder-list",
    title: "Reorder List",
    difficulty: "Medium",
    category: "Linked List",
    patternId: "linked-list",
    types: ["Linked List", "Two Pointers"],
    problem:
      "Given the head of a linked list, reorder it so the nodes go: first, last, second, second-to-last, third, third-to-last, and so on — without changing the actual node values.",
    simpleExplanation:
      "Split the list into two halves, reverse the second half completely, then weave (zip) the two halves back together by alternating nodes from each side.",
    hints: [
      "Use a fast/slow pointer to find the middle of the list and split it into two halves.",
      "Reverse the second half of the list completely, so it now runs backward (last node first).",
      "Merge the two halves by alternating one node from the first half, then one from the reversed second half, repeatedly.",
    ],
    samples: [
      { input: "head = [1,2,3,4]", output: "[1,4,2,3]", explanation: "Splitting into [1,2] and [4,3] (reversed second half), then zipping them together alternately gives this reordered list." },
      { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]", explanation: "The first half [1,2,3] and reversed second half [5,4] zip together, with the leftover middle node (3) landing last." },
      { input: "head = [1]", output: "[1]", explanation: "A single-node list has nothing to reorder — it stays exactly the same." },
    ],
    edgeCases: [
      "A list with only one or two nodes needs little or no actual reordering.",
      "An odd-length list leaves one node in the middle that doesn't pair with anything.",
      "Reversing the second half incorrectly can accidentally break the link back to the first half — must handle the splitting point carefully.",
    ],
    visual: { type: "linkedlist", data: [1, 4, 2, 3] },
  },

  // ---------------- MATRIX ----------------
  {
    id: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "Matrix",
    patternId: "matrix-traversal",
    types: ["Matrix"],
    problem:
      "Given an m x n matrix, if an element is 0, set its entire row and entire column to 0. Do it in place.",
    simpleExplanation:
      "First, just note down which rows and which columns contain at least one zero (without changing anything yet). Then go back through the matrix and zero out every cell in those marked rows and columns.",
    hints: [
      "First pass: scan the whole matrix and record which rows and which columns contain at least one 0, without modifying anything yet.",
      "Second pass: go through the matrix again, and for any cell whose row or column was marked, set it to 0.",
      "Doing it in exactly two passes (record, then apply) avoids incorrectly zeroing out cells that would create new false zeros mid-scan.",
    ],
    samples: [
      { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]", explanation: "The single 0 at the center zeroes out its entire row and entire column." },
      { input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]", output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]", explanation: "Two separate zeroes each wipe out their own row and column, and the effects combine on shared cells." },
      { input: "matrix = [[1]]", output: "[[1]]", explanation: "A single non-zero cell with no zeroes anywhere stays completely unchanged." },
    ],
    edgeCases: [
      "A matrix with no zeroes at all remains completely unchanged.",
      "A matrix that is entirely zeroes stays entirely zeroes.",
      "A zero in the very first row or column needs special care so it doesn't get mistaken for a 'marker' cell during the first pass.",
    ],
  },
  {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "Matrix",
    patternId: "matrix-traversal",
    types: ["Matrix"],
    problem:
      "Given an m x n matrix, return all its elements in spiral order — starting at the top-left, moving right, then down, then left, then up, and repeating inward.",
    simpleExplanation:
      "Keep track of the current top, bottom, left, and right boundaries of the unvisited area. Walk across the top row, down the right column, across the bottom row, and up the left column, then shrink the boundaries inward and repeat.",
    hints: [
      "Track four boundaries: top row, bottom row, left column, right column — starting at the matrix's edges.",
      "Walk along the top boundary left-to-right, then the right boundary top-to-bottom, then the bottom boundary right-to-left, then the left boundary bottom-to-top.",
      "After each full loop, shrink all four boundaries inward by one, and repeat until they cross each other.",
    ],
    samples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]", explanation: "Spiraling around the outer edge first (1,2,3,6,9,8,7,4), then the single leftover center cell (5)." },
      { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", output: "[1,2,3,4,8,12,11,10,9,5,6,7]", explanation: "The spiral wraps fully around the outside first, then curls into the remaining inner row." },
      { input: "matrix = [[1]]", output: "[1]", explanation: "A single-cell matrix has only one element to output." },
    ],
    edgeCases: [
      "A matrix with just one row, or just one column — the spiral is simply a straight line.",
      "A single-cell matrix — the output is just that one element.",
      "Non-square matrices (more rows than columns, or vice versa) still need the boundaries tracked correctly so they don't overlap incorrectly.",
    ],
  },
  {
    id: "rotate-image",
    title: "Rotate Image",
    difficulty: "Medium",
    category: "Matrix",
    patternId: "matrix-traversal",
    types: ["Matrix"],
    problem:
      "Given an n x n matrix representing an image, rotate it 90 degrees clockwise, in place (without allocating a new matrix).",
    simpleExplanation:
      "Rotating 90 degrees clockwise can be done in two simple steps: first flip the matrix along its diagonal (transpose it, swapping rows and columns), then reverse every row.",
    hints: [
      "Step 1: transpose the matrix — swap matrix[i][j] with matrix[j][i] for every pair above the diagonal.",
      "Step 2: reverse each row of the transposed matrix from left to right.",
      "Together, these two simple steps produce a 90-degree clockwise rotation without needing any extra matrix.",
    ],
    samples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]", explanation: "Transposing then reversing each row rotates the whole grid 90 degrees clockwise." },
      { input: "matrix = [[1,2],[3,4]]", output: "[[3,1],[4,2]]", explanation: "This small 2x2 grid rotates the same way — transpose then reverse each row." },
      { input: "matrix = [[1]]", output: "[[1]]", explanation: "A single-cell matrix looks identical no matter how you rotate it." },
    ],
    edgeCases: [
      "A 1x1 matrix stays exactly the same after any rotation.",
      "It must be done truly in place — no separate new matrix should be allocated.",
      "Even-sized vs odd-sized matrices both need the transpose+reverse approach to work correctly without special-casing.",
    ],
  },
  {
    id: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    category: "Matrix",
    patternId: "backtracking",
    types: ["Matrix", "Backtracking"],
    problem:
      "Given a grid of letters and a word, determine if the word can be formed by tracing a path through adjacent cells (up/down/left/right), without reusing the same cell twice.",
    simpleExplanation:
      "Try starting the word from every cell in the grid. From each starting point, explore letter by letter in every direction, backing up (backtracking) whenever a path doesn't match or runs into an already-used cell.",
    hints: [
      "Try starting the search from every cell that matches the word's first letter.",
      "From there, recursively try each of the 4 neighboring directions, checking if the next letter of the word matches.",
      "Temporarily mark a cell as 'used' while exploring from it, and un-mark it when backtracking, so paths don't reuse the same cell twice.",
    ],
    samples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true", explanation: "Tracing A→B→C→C→E→D through adjacent cells spells out the target word exactly." },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: "true", explanation: "Tracing S→E→E through adjacent cells (bottom-right area) spells out the word." },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: "false", explanation: "After A→B→C, there's no way to reach another 'B' from there without reusing an already-visited cell." },
    ],
    edgeCases: [
      "The word could be longer than the number of cells in the grid — automatically impossible.",
      "A cell can't be reused twice within the same path attempt, even if its letter would otherwise fit again.",
      "The same starting letter might appear in multiple places in the grid — each needs to be tried separately.",
    ],
  },

  // ---------------- STRING ----------------
  {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    patternId: "sliding-window",
    types: ["String", "Sliding Window"],
    problem:
      "Given a string, find the length of the longest substring (contiguous section) that has no repeating characters.",
    simpleExplanation:
      "Grow a window from left to right, one character at a time. If the new character is already inside your current window, shrink the window from the left until that duplicate is gone.",
    hints: [
      "Use a sliding window with a left and right edge, plus a set (or map) of characters currently inside the window.",
      "Expand the right edge one character at a time; if that character is already in the window, shrink from the left until it's no longer a duplicate.",
      "Track the maximum window size seen at any point as your answer.",
    ],
    samples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The longest repeat-free substring is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: "Every character is the same, so the best you can do is a single character at a time." },
      { input: 's = "pwwkew"', output: "3", explanation: '"wke" is the longest substring with no repeating characters, length 3.' },
    ],
    edgeCases: [
      "An empty string has an answer of 0.",
      "A string with all identical characters — the answer is always 1.",
      "A string with all unique characters already — the answer is the full string length.",
    ],
  },
  {
    id: "longest-repeating-character-replacement",
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    category: "String",
    patternId: "sliding-window",
    types: ["String", "Sliding Window"],
    problem:
      "Given a string and a number k, you may replace up to k characters in any substring with any other character. Find the length of the longest substring you can make consist of a single repeated character.",
    simpleExplanation:
      "Grow a sliding window and track the count of the most frequent character inside it. If the number of characters that would need replacing (window size minus that most-frequent count) exceeds k, shrink the window from the left.",
    hints: [
      "Use a sliding window, tracking how many times each character appears inside it.",
      "At each step, check: window size − count of the most frequent character in the window = how many replacements would be needed.",
      "If that number exceeds k, shrink the window from the left; otherwise, keep growing and track the biggest valid window size.",
    ],
    samples: [
      { input: 's = "ABAB", k = 2', output: "4", explanation: 'Replacing the two "A"s or two "B"s (using up to 2 replacements) can make the whole string one repeated character.' },
      { input: 's = "AABABBA", k = 1', output: "4", explanation: 'With one replacement allowed, a window like "AABA" (change one B to A) becomes all A\'s, length 4.' },
      { input: 's = "ABCDE", k = 1', output: "2", explanation: "With only 1 replacement allowed, you can make at most 2 characters match at a time in this fully varied string." },
    ],
    edgeCases: [
      "k equal to or larger than the string's length — the whole string can always be made uniform.",
      "k = 0 — no replacements allowed, so the answer is just the longest existing run of one repeated character.",
      "A string that's already all the same character — the whole string is the answer regardless of k.",
    ],
  },
  {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    category: "String",
    patternId: "sliding-window",
    types: ["String", "Sliding Window"],
    problem:
      "Given a string s and a string t, find the smallest substring of s that contains every character of t (including matching counts of repeated characters).",
    simpleExplanation:
      "Grow a window until it contains everything needed from t, then shrink it from the left as much as possible while still keeping everything needed — tracking the smallest valid window found along the way.",
    hints: [
      "Count how many of each character you need from t.",
      "Grow the window's right edge until it contains enough of every needed character.",
      "Once valid, shrink from the left as far as possible while staying valid, recording the smallest valid window size seen so far, then continue growing again.",
    ],
    samples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: '"BANC" is the smallest substring of s that contains an A, a B, and a C.' },
      { input: 's = "a", t = "a"', output: '"a"', explanation: "The string itself is already the smallest (and only) window containing what's needed." },
      { input: 's = "a", t = "aa"', output: '""', explanation: 't needs two "a" characters, but s only has one available — impossible, so the answer is empty.' },
    ],
    edgeCases: [
      "t requires more copies of a character than exist anywhere in s — no valid window exists, return empty.",
      "s and t are the same string — the entire string is the answer.",
      "t is longer than s — automatically impossible.",
    ],
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "String",
    patternId: "hash-map",
    types: ["String", "Hash Map"],
    problem:
      "Given two strings, determine if the second one is an anagram of the first (uses the exact same letters, same counts, just rearranged).",
    simpleExplanation:
      "Count how many times each letter appears in the first string, then subtract those counts as you go through the second string. If everything cancels out to zero, they're anagrams.",
    hints: [
      "If the two strings have different lengths, they can't possibly be anagrams — check that first.",
      "Count each letter's frequency in the first string using a hash map.",
      "Go through the second string, decreasing the count for each letter seen; if any count goes negative or isn't fully zero at the end, they aren't anagrams.",
    ],
    samples: [
      { input: 's = "anagram", t = "nagaram"', output: "true", explanation: "Both strings use exactly the same letters with the same frequency, just in a different order." },
      { input: 's = "rat", t = "car"', output: "false", explanation: "\"rat\" and \"car\" don't share the same letters at all — not an anagram." },
      { input: 's = "a", t = "ab"', output: "false", explanation: "Different lengths mean they can never be anagrams of each other." },
    ],
    edgeCases: [
      "Different string lengths immediately rule out being anagrams.",
      "Case sensitivity matters unless the problem says to ignore it — 'A' and 'a' are typically different characters.",
      "Repeated letters must match in exact count, not just which letters are present.",
    ],
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "String",
    patternId: "hash-map",
    types: ["String", "Hash Map"],
    problem:
      "Given a list of strings, group the ones that are anagrams of each other together.",
    simpleExplanation:
      "For every word, sort its letters to build a 'signature' — anagrams always share the exact same sorted signature. Use that signature as a key in a hash map to group matching words together.",
    hints: [
      "For each word, compute a signature by sorting its letters alphabetically.",
      "Use a hash map where the key is that sorted signature, and the value is the list of original words sharing it.",
      "At the end, the hash map's values are exactly your grouped anagrams.",
    ],
    samples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: 'Words sharing the same sorted letters ("aet" → eat/tea/ate, "ant" → tan/nat) get grouped together; "bat" is alone.' },
      { input: 'strs = [""]', output: '[[""]]', explanation: "A single empty string forms its own group by itself." },
      { input: 'strs = ["a"]', output: '[["a"]]', explanation: "A single one-letter word forms its own group." },
    ],
    edgeCases: [
      "An empty string in the list still needs its own valid group (its sorted signature is just empty).",
      "A word with no anagram partners still needs to appear as its own single-item group.",
      "The order of groups, and order within a group, usually doesn't need to match any particular order.",
    ],
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String",
    patternId: "two-pointers",
    types: ["String", "Two Pointers"],
    problem:
      "Given a string, determine if it's a palindrome after converting all letters to lowercase and removing all non-alphanumeric characters.",
    simpleExplanation:
      "Clean the string down to just letters and numbers, ignore casing, then use two pointers from both ends moving inward, checking that matching positions are equal all the way to the middle.",
    hints: [
      "Use two pointers, one starting at the left end and one at the right end of the string.",
      "Skip over any character that isn't a letter or number by moving that pointer inward without comparing.",
      "Compare the two characters (ignoring case) — if they ever differ, it's not a palindrome; if the pointers meet without a mismatch, it is.",
    ],
    samples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: "After removing punctuation/spaces and lowercasing, it reads 'amanaplanacanalpanama', which is the same forwards and backwards." },
      { input: 's = "race a car"', output: "false", explanation: "Cleaned up, it reads 'raceacar', which is not the same read backwards." },
      { input: 's = " "', output: "true", explanation: "After removing the space (a non-alphanumeric character), there's nothing left, and an empty string is trivially a palindrome." },
    ],
    edgeCases: [
      "A string that becomes empty after removing all punctuation/spaces is considered a valid palindrome.",
      "Mixed uppercase and lowercase letters must be compared as equal (case-insensitive).",
      "Numbers count as valid characters to compare, not just letters.",
    ],
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    patternId: "two-pointers",
    types: ["String", "Two Pointers"],
    problem:
      "Given a string, find the longest substring within it that reads the same forwards and backwards.",
    simpleExplanation:
      "Try every possible 'center' of a palindrome (each single character, and each gap between two characters), and expand outward from it in both directions as long as the characters keep matching.",
    hints: [
      "A palindrome is symmetric around some center — that center is either a single character (odd length) or a gap between two characters (even length).",
      "For every possible center in the string, expand outward left and right as long as the characters on both sides keep matching.",
      "Keep track of the longest palindrome found across all the centers you tried.",
    ],
    samples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"bab" is a palindrome of length 3 (note "aba" is also a valid length-3 answer).' },
      { input: 's = "cbbd"', output: '"bb"', explanation: '"bb" is the longest palindromic substring here, length 2.' },
      { input: 's = "a"', output: '"a"', explanation: "A single character is always its own palindrome." },
    ],
    edgeCases: [
      "A single-character string is always a palindrome of length 1.",
      "The whole string might itself already be a palindrome.",
      "There can be multiple valid longest answers of the same length — any one of them is typically accepted.",
    ],
  },
  {
    id: "palindromic-substrings",
    title: "Palindromic Substrings",
    difficulty: "Medium",
    category: "String",
    patternId: "two-pointers",
    types: ["String", "Two Pointers"],
    problem:
      "Given a string, count how many substrings within it are palindromes (including single characters).",
    simpleExplanation:
      "Just like finding the longest palindrome, try every possible center and expand outward — but this time, count every valid palindrome you find along the way instead of just tracking the longest one.",
    hints: [
      "For every possible center (each character, and each gap between two characters), expand outward as long as both sides match.",
      "Every successful expansion step represents one valid palindrome — count each one.",
      "Add up all the counts from every center to get the total number of palindromic substrings.",
    ],
    samples: [
      { input: 's = "abc"', output: "3", explanation: '"a", "b", and "c" are each their own single-character palindrome — 3 total.' },
      { input: 's = "aaa"', output: "6", explanation: 'The palindromes are: "a", "a", "a", "aa", "aa", "aaa" — 6 total, counting overlapping ones separately.' },
      { input: 's = "racecar"', output: "10", explanation: "Counting every single character, every palindrome pair/triple, and the whole word itself adds up to 10 palindromic substrings." },
    ],
    edgeCases: [
      "Every single character always counts as its own palindrome, so the answer is never less than the string's length.",
      "A string made entirely of the same repeated character produces many overlapping palindromes.",
      "An empty string has 0 palindromic substrings.",
    ],
  },
  {
    id: "encode-and-decode-strings",
    title: "Encode and Decode Strings (Premium)",
    difficulty: "Medium",
    category: "String",
    patternId: "design",
    types: ["String", "Design"],
    problem:
      "Design a way to encode a list of strings into a single string, and a way to decode that single string back into the original list of strings.",
    simpleExplanation:
      "Since strings can contain any character (including the ones you might normally use as a separator), prefix each string with its length before joining them, so decoding always knows exactly where one string ends and the next begins.",
    hints: [
      "For encoding, write each string's length followed by a special delimiter (like '#'), then the string itself, and repeat for every string in the list.",
      "For decoding, read the digits before each '#' to know exactly how many characters to read next as one full string.",
      "Using length-prefixes like this avoids any confusion from strings that might contain your delimiter character themselves.",
    ],
    samples: [
      { input: 'strs = ["lint","code","love","you"]', output: '"4#lint4#code4#love3#you" → ["lint","code","love","you"]', explanation: "Each string is prefixed with its length and a '#', letting decoding know exactly how many characters belong to each piece." },
      { input: 'strs = [""]', output: '"0#" → [""]', explanation: "An empty string still gets encoded with a length of 0, so decoding correctly reconstructs an empty string." },
      { input: "strs = []", output: '"" → []', explanation: "An empty list of strings encodes into an empty string, and decodes back into an empty list." },
    ],
    edgeCases: [
      "Strings that contain digits or the delimiter character themselves must not confuse the decoder — length-prefixing solves this.",
      "An empty string within the list must still be encoded and decoded correctly (as length 0).",
      "An empty list of strings overall should encode/decode cleanly without errors.",
    ],
  },

  // ---------------- TREE ----------------
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    patternId: "recursion",
    types: ["Tree", "Recursion"],
    problem:
      "Given the root of a binary tree, find its maximum depth (the number of nodes along the longest path from the root down to the farthest leaf).",
    simpleExplanation:
      "The depth of a tree is 1 (for the current node) plus the deeper of its two children's depths. An empty tree has depth 0 — that's your stopping point.",
    hints: [
      "If the current node doesn't exist (null), its depth is 0 — that's the base case.",
      "Otherwise, recursively find the depth of the left subtree and the right subtree.",
      "The depth of the current node is 1 plus whichever of the two subtree depths is bigger.",
    ],
    samples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3", explanation: "The longest path goes from 3 down to either 15 or 7, passing through 20 — three nodes deep." },
      { input: "root = [1,null,2]", output: "2", explanation: "The tree only goes one level deep on the right side, giving a total depth of 2." },
      { input: "root = []", output: "0", explanation: "An empty tree has no nodes at all, so its depth is 0." },
    ],
    edgeCases: [
      "An empty tree (no root at all) has depth 0.",
      "A tree with only a single root node has depth 1.",
      "A completely lopsided tree (all nodes only going left, or only going right) still works fine with this approach.",
    ],
    visual: { type: "tree", data: [3, 9, 20, null, null, 15, 7] },
  },
  {
    id: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    category: "Tree",
    patternId: "recursion",
    types: ["Tree", "Recursion"],
    problem:
      "Given the roots of two binary trees, determine if they are structurally identical and have the same node values.",
    simpleExplanation:
      "Compare the two trees node by node at the same time: their current values must match, and their left subtrees must match each other, and their right subtrees must match each other too.",
    hints: [
      "If both current nodes are null at the same time, that part matches — return true for this branch.",
      "If only one of the two nodes is null (not both), or their values differ, the trees don't match here.",
      "Otherwise, recursively check that both left subtrees match, AND both right subtrees match.",
    ],
    samples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true", explanation: "Both trees have identical structure and identical values at every matching position." },
      { input: "p = [1,2], q = [1,null,2]", output: "false", explanation: "The single child node is on the left in one tree but on the right in the other — different structure." },
      { input: "p = [1,2,1], q = [1,1,2]", output: "false", explanation: "The structures match, but the values at the child positions are swapped." },
    ],
    edgeCases: [
      "Both trees are empty (both null) — considered the same, trivially.",
      "One tree is empty while the other has nodes — automatically not the same.",
      "Same values, but arranged in different structural positions — must be detected as different.",
    ],
    visual: { type: "tree", data: [1, 2, 3] },
  },
  {
    id: "invert-binary-tree",
    title: "Invert/Flip Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    patternId: "recursion",
    types: ["Tree", "Recursion"],
    problem:
      "Given the root of a binary tree, invert it (mirror it) so every left child becomes a right child and vice versa, then return the root.",
    simpleExplanation:
      "At every node, simply swap its left and right children, then do the same thing to those children (and their children, and so on) all the way down the tree.",
    hints: [
      "If the current node is null, there's nothing to invert — that's the base case.",
      "Swap the current node's left and right children.",
      "Recursively invert what is now the left subtree, and recursively invert what is now the right subtree.",
    ],
    samples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]", explanation: "Every left/right pair throughout the tree gets swapped, producing a perfect mirror image." },
      { input: "root = [2,1,3]", output: "[2,3,1]", explanation: "The two children (1 and 3) simply swap places." },
      { input: "root = []", output: "[]", explanation: "An empty tree, when inverted, is still just an empty tree." },
    ],
    edgeCases: [
      "An empty tree — inverting it does nothing, it's still empty.",
      "A tree with only one node — inverting it changes nothing visible, since there are no children to swap.",
      "A tree that's already symmetric might look unchanged after inverting, even though the swap did technically happen.",
    ],
    visual: { type: "tree", data: [4, 2, 7, 1, 3, 6, 9] },
  },
  {
    id: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    category: "Tree",
    patternId: "recursion",
    types: ["Tree", "Recursion"],
    problem:
      "Given the root of a binary tree, find the maximum sum of any path in the tree, where a path can start and end at any node (it doesn't need to pass through the root).",
    simpleExplanation:
      "For each node, work out the best 'downward-only' path sum extending from it (used by its parent), while separately checking if using this node as the very top of a 'peak' path (going down both left and right at once) beats the best answer found so far.",
    hints: [
      "For each node, compute the best single-direction path sum extending downward from it (left path or right path, whichever is better, ignoring negative contributions by treating them as 0).",
      "Separately, check if combining the node's value with both its left AND right downward paths (a 'peak' shape) gives a bigger total — update the global best answer if so.",
      "Only the single-direction result gets returned upward to the parent, since a path can only pass through each node once.",
    ],
    samples: [
      { input: "root = [1,2,3]", output: "6", explanation: "The best path goes 2 → 1 → 3, summing to 6, using the root as a peak connecting both children." },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "The best path skips the root entirely and goes 15 → 20 → 7, summing to 42." },
      { input: "root = [-3]", output: "-3", explanation: "With only one node (and it's negative), the best possible path is just that single node itself." },
    ],
    edgeCases: [
      "All negative values — the answer is simply the least negative single node, since a path can't be empty.",
      "The best path might not include the root at all, only some deeper subtree.",
      "Negative subtree contributions should be treated as 0 (skipped) when extending a path downward, but the node's own value is always included.",
    ],
    visual: { type: "tree", data: [1, 2, 3] },
  },
  {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree",
    patternId: "graph-traversal",
    types: ["Tree", "BFS"],
    problem:
      "Given the root of a binary tree, return the values of its nodes grouped level by level, from top to bottom, left to right.",
    simpleExplanation:
      "This is a classic Breadth-First Search: use a queue, process one whole level at a time by tracking exactly how many nodes are currently in the queue for that level.",
    hints: [
      "Use a queue, starting with just the root node inside it.",
      "At each round, note how many nodes are currently in the queue — that's exactly how many belong to the current level.",
      "Process exactly that many nodes, collecting their values and adding their children to the queue for the next level.",
    ],
    samples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", explanation: "Level 0 has just the root (3), level 1 has its two children (9, 20), and level 2 has the grandchildren (15, 7)." },
      { input: "root = [1]", output: "[[1]]", explanation: "A tree with only the root has just a single level containing that one value." },
      { input: "root = []", output: "[]", explanation: "An empty tree produces no levels at all." },
    ],
    edgeCases: [
      "An empty tree returns an empty list of levels.",
      "A single-node tree returns one level with just that one value.",
      "A lopsided tree (all children on one side) still needs correct level grouping despite the uneven shape.",
    ],
    visual: { type: "tree", data: [3, 9, 20, null, null, 15, 7] },
  },
  {
    id: "serialize-and-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    category: "Tree",
    patternId: "graph-traversal",
    types: ["Tree", "Design"],
    problem:
      "Design an algorithm to convert a binary tree into a string (serialize), and convert that string back into the original tree structure (deserialize).",
    simpleExplanation:
      "Walk through the tree (pre-order works well) and write down every node's value, explicitly recording 'null' for missing children, separated by commas. To rebuild, read the values back in the same order, recursively rebuilding left and right children.",
    hints: [
      "For serializing, do a pre-order walk (node, then left, then right), writing 'null' explicitly whenever a child is missing — this is essential for correct rebuilding.",
      "Join all the values (including the nulls) into one string separated by a delimiter like commas.",
      "For deserializing, read the values back in the exact same order, recursively building each node and its children using the recorded nulls to know where to stop.",
    ],
    samples: [
      { input: "root = [1,2,3,null,null,4,5]", output: '"1,2,null,null,3,4,null,null,5,null,null" → [1,2,3,null,null,4,5]', explanation: "Recording explicit nulls during serialization lets deserialization perfectly rebuild the original tree shape." },
      { input: "root = []", output: '"null" → []', explanation: "An empty tree serializes into a single marker representing 'nothing here', and deserializes back into an empty tree." },
      { input: "root = [1]", output: '"1,null,null" → [1]', explanation: "A single node with no children serializes with two explicit nulls for its missing left and right children." },
    ],
    edgeCases: [
      "An empty tree must serialize and deserialize back to an empty tree correctly.",
      "Explicit null markers are essential — without them, you can't tell whether a missing child means 'no more nodes' or 'this branch just ends here'.",
      "Very deep or very lopsided trees still need to round-trip correctly through the same process.",
    ],
    visual: { type: "tree", data: [1, 2, 3, null, null, 4, 5] },
  },
  {
    id: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    difficulty: "Easy",
    category: "Tree",
    patternId: "recursion",
    types: ["Tree", "Recursion"],
    problem:
      "Given the roots of two binary trees, determine if the second tree is exactly a subtree of the first (matches some node in the first tree and everything below it).",
    simpleExplanation:
      "At every node in the big tree, check if the subtree starting there is an exact match (same structure, same values) to the smaller tree. If any node passes that check, the answer is yes.",
    hints: [
      "Write a helper that checks if two trees are exactly identical (reuse the 'Same Tree' idea).",
      "Walk through every node of the big tree, and at each one, run that 'identical' check between this node's subtree and the target smaller tree.",
      "If any node in the big tree produces a match, the answer is true; if you finish checking every node with no match, it's false.",
    ],
    samples: [
      { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true", explanation: "The subtree starting at node 4 in the big tree matches subRoot exactly." },
      { input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]", output: "false", explanation: "The subtree at node 4 now has an extra node (0) that subRoot doesn't have, so it's no longer an exact match." },
      { input: "root = [1], subRoot = [1]", output: "true", explanation: "The entire tree is a single node that exactly matches subRoot." },
    ],
    edgeCases: [
      "subRoot could be the entire root tree itself — that still counts as a valid match.",
      "An empty subRoot is often considered to trivially match anywhere (edge case depends on problem definition).",
      "A subtree with the same values but slightly different structure (extra or missing nodes) must be correctly rejected.",
    ],
    visual: { type: "tree", data: [3, 4, 5, 1, 2] },
  },
  {
    id: "construct-binary-tree-from-preorder-and-inorder-traversal",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "Medium",
    category: "Tree",
    patternId: "recursion",
    types: ["Tree", "Recursion"],
    problem:
      "Given two lists representing the preorder and inorder traversal of a binary tree, reconstruct and return the original tree.",
    simpleExplanation:
      "The very first value in preorder is always the root. Find that same value in inorder — everything to its left in inorder is the left subtree, everything to its right is the right subtree. Repeat this recursively for each half.",
    hints: [
      "The first element of the preorder list is always the root of the (sub)tree you're currently building.",
      "Find that root's value in the inorder list — everything before it belongs to the left subtree, everything after belongs to the right subtree.",
      "Recursively repeat this process on the corresponding left and right slices of both lists to build the subtrees.",
    ],
    samples: [
      { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]", explanation: "3 is the root (first in preorder); in inorder, 9 is to its left (left subtree) and 15,20,7 are to its right (right subtree)." },
      { input: "preorder = [-1], inorder = [-1]", output: "[-1]", explanation: "A single-node tree — trivially, that one value is both the root and the whole tree." },
      { input: "preorder = [1,2], inorder = [2,1]", output: "[1,2]", explanation: "1 is the root; since 2 appears before 1 in inorder, it must be the left child." },
    ],
    edgeCases: [
      "A tree with only one node — both lists contain just that single value.",
      "A completely left-leaning or right-leaning tree (no branching at all) still needs correct splitting at each step.",
      "Repeated values in the tree can make finding the correct split point tricky — the problem typically guarantees unique values to avoid this.",
    ],
    visual: { type: "tree", data: [3, 9, 20, null, null, 15, 7] },
  },
  {
    id: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Tree",
    patternId: "recursion",
    types: ["Tree", "Recursion"],
    problem:
      "Given the root of a binary tree, determine if it is a valid binary search tree (every node's value is strictly between a valid lower and upper bound based on its ancestors).",
    simpleExplanation:
      "It's not enough to just compare each node to its immediate children — every node must respect bounds set by ALL of its ancestors, not just its direct parent. Pass down a valid (min, max) range as you recurse.",
    hints: [
      "Recursively check each node against an allowed (min, max) range, starting with (-infinity, +infinity) at the root.",
      "When moving into the left child, tighten the upper bound to the current node's value; moving into the right child, tighten the lower bound.",
      "If any node's value falls outside its currently allowed range, the tree is not a valid BST.",
    ],
    samples: [
      { input: "root = [2,1,3]", output: "true", explanation: "1 < 2 < 3, and both children respect the valid range around the root — a valid BST." },
      { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "The node with value 3 is in the right subtree of 5, but it's smaller than 5, and specifically it's less than the left-subtree root of 4 too — this violates BST rules." },
      { input: "root = [1]", output: "true", explanation: "A single node has no children to violate any ordering — trivially valid." },
    ],
    edgeCases: [
      "A node that satisfies its direct parent's comparison but violates a grandparent's bound must still be caught — always track full ranges, not just parent comparisons.",
      "Duplicate values are usually considered invalid in a strict BST (must be strictly less-than or greater-than).",
      "A single-node tree, or an empty tree, is always considered a valid BST.",
    ],
    visual: { type: "tree", data: [2, 1, 3] },
  },
  {
    id: "kth-smallest-element-in-a-bst",
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    category: "Tree",
    patternId: "recursion",
    types: ["Tree", "Recursion"],
    problem:
      "Given the root of a binary search tree, and an integer k, return the k-th smallest value stored in it.",
    simpleExplanation:
      "An in-order traversal (left, then node, then right) of a BST always visits nodes in sorted order — so the k-th smallest is simply the k-th value you encounter during that walk.",
    hints: [
      "Recall that an in-order traversal of a BST always visits values in increasing sorted order.",
      "Walk through the tree in-order, counting nodes as you visit them.",
      "Stop and return the value as soon as your count reaches k.",
    ],
    samples: [
      { input: "root = [3,1,4,null,2], k = 1", output: "1", explanation: "Walking in-order (1, 2, 3, 4), the 1st smallest value is 1." },
      { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3", explanation: "Walking in-order (1, 2, 3, 4, 5, 6), the 3rd smallest value is 3." },
      { input: "root = [1], k = 1", output: "1", explanation: "With just one node, the 1st smallest is trivially that node's own value." },
    ],
    edgeCases: [
      "k equal to the total number of nodes — the k-th smallest is simply the largest value in the tree.",
      "A tree that's heavily lopsided (all left or all right) still works fine since in-order traversal handles any shape.",
      "k = 1 always gives the very smallest (leftmost) value in the tree.",
    ],
    visual: { type: "tree", data: [3, 1, 4, null, 2] },
  },
  {
    id: "lowest-common-ancestor-of-bst",
    title: "Lowest Common Ancestor of BST",
    difficulty: "Medium",
    category: "Tree",
    patternId: "recursion",
    types: ["Tree", "Recursion"],
    problem:
      "Given the root of a binary search tree and two node values, find the lowest (deepest) node that is an ancestor of both.",
    simpleExplanation:
      "Since it's a BST, you can use the ordering to decide direction: if both target values are smaller than the current node, the answer must be in the left subtree; if both are larger, it's in the right subtree; otherwise, the current node is the split point — the answer.",
    hints: [
      "Start at the root and compare both target values to the current node's value.",
      "If both targets are smaller, move into the left subtree; if both are larger, move into the right subtree.",
      "The moment the targets are on different sides (or one equals the current node), you've found the lowest common ancestor — return it.",
    ],
    samples: [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6", explanation: "2 is in the left subtree of 6, and 8 is in the right subtree — 6 is exactly the split point, so it's the lowest common ancestor." },
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", output: "2", explanation: "4 is actually inside the subtree rooted at 2, so 2 itself is the lowest common ancestor of the two." },
      { input: "root = [2,1], p = 2, q = 1", output: "2", explanation: "Since one of the targets is the root itself, the root is automatically the lowest common ancestor." },
    ],
    edgeCases: [
      "One of the two target nodes is itself an ancestor of the other — the answer is simply that higher node.",
      "The two target nodes could be direct siblings, making their shared parent the answer.",
      "The BST could be lopsided entirely to one side — the same left/right comparison logic still applies correctly.",
    ],
    visual: { type: "tree", data: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5] },
  },
  {
    id: "implement-trie",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "Tree",
    patternId: "trie",
    types: ["Trie", "Design"],
    problem:
      "Design a Trie (prefix tree) that supports inserting a word, searching for an exact word, and checking if any word starts with a given prefix.",
    simpleExplanation:
      "Each node holds links to its possible next letters. Inserting a word walks down (creating new letter-nodes as needed) and marks the final node as 'end of word'. Searching just walks the same path and checks if it exists (and, for exact search, whether it's marked as a word-ending).",
    hints: [
      "Each trie node needs: a collection of child nodes (one per possible next letter), and a flag marking 'a word ends here'.",
      "To insert a word, walk letter by letter, creating a new child node whenever the needed letter link doesn't exist yet, then mark the final node's flag.",
      "To search, walk letter by letter the same way; if any needed link is missing, it doesn't exist. For 'search exact word', also check the final node's end-of-word flag; for 'starts with prefix', just checking the path exists is enough.",
    ],
    samples: [
      { input: 'insert("apple"); search("apple")', output: "true", explanation: "After inserting \"apple\" letter by letter, searching for the exact same word finds a complete matching path ending in a word marker." },
      { input: 'search("app")', output: "false", explanation: '"app" exists as a path in the trie (since it\'s a prefix of "apple"), but it was never itself marked as a complete inserted word.' },
      { input: 'startsWith("app")', output: "true", explanation: 'The letters a-p-p do form a valid path in the trie, even though "app" was never inserted as its own word.' },
    ],
    edgeCases: [
      "Searching for a prefix that exists as a path but was never explicitly inserted as a full word should return false for search(), but true for startsWith().",
      "Inserting the same word twice shouldn't cause any issues — it just reuses the existing path.",
      "An empty string as input needs sensible handling depending on the problem's exact rules.",
    ],
  },
  {
    id: "add-and-search-word",
    title: "Add and Search Word",
    difficulty: "Medium",
    category: "Tree",
    patternId: "trie",
    types: ["Trie", "Backtracking"],
    problem:
      "Design a data structure that supports adding words, and searching for a word where the search word may contain '.' as a wildcard that matches any single letter.",
    simpleExplanation:
      "Store words in a trie just like before. When searching, walk the trie letter by letter as usual — but whenever you hit a '.', try every possible child branch at that point (backtracking) since it could match any letter.",
    hints: [
      "Use the same trie structure as a normal prefix tree, with a flag marking 'a word ends here'.",
      "When searching, if the current character is a normal letter, follow that one specific child link as usual.",
      "When the current character is '.', try every existing child link at that node (backtracking through each possibility) to see if any of them leads to a full match.",
    ],
    samples: [
      { input: 'addWord("bad"); addWord("dad"); addWord("mad"); search("pad")', output: "false", explanation: '"pad" was never added, and there\'s no wildcard here to help it match anything else.' },
      { input: 'search("bad")', output: "true", explanation: '"bad" was explicitly added earlier, so it matches directly, letter by letter.' },
      { input: 'search(".ad")', output: "true", explanation: "The wildcard '.' can match 'b', 'd', or 'm' — all three lead to previously added words, so it finds a match." },
    ],
    edgeCases: [
      "A search word made entirely of wildcards (like '...') needs to try every combination of that length in the trie.",
      "A wildcard at the very start, middle, or end of the search word should all be handled the same way.",
      "Searching for a word longer than anything ever added should correctly return false without crashing.",
    ],
  },
  {
    id: "word-search-ii",
    title: "Word Search II",
    difficulty: "Hard",
    category: "Tree",
    patternId: "backtracking",
    types: ["Trie", "Backtracking", "Matrix"],
    problem:
      "Given a grid of letters and a list of words, return all words from the list that can be formed by tracing a path through adjacent cells (like Word Search, but for many words at once).",
    simpleExplanation:
      "Instead of searching the grid separately for every single word (slow), build a trie out of all the words first. Then explore the grid once, following trie paths — any point where the trie says 'a word ends here' is a match.",
    hints: [
      "Build a trie containing all the words you're searching for, so shared prefixes are explored together instead of repeatedly.",
      "Explore the grid using backtracking (like Word Search), but guide the exploration using the trie: only continue in directions where the trie still has a matching next letter.",
      "Whenever your current trie position is marked 'end of word', you've found a match — add it to your results (and consider marking it so you don't add duplicates).",
    ],
    samples: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]', explanation: '"oath" and "eat" can both be traced through adjacent cells in the grid, while "pea" and "rain" cannot.' },
      { input: 'board = [["a","b"],["c","d"]], words = ["abcb"]', output: "[]", explanation: "Tracing \"abcb\" would require reusing the letter 'b' twice, which isn't allowed in a single path." },
      { input: 'board = [["a"]], words = ["a"]', output: '["a"]', explanation: "The single cell 'a' directly matches the single-letter word \"a\"." },
    ],
    edgeCases: [
      "Words that share a common prefix should reuse the same trie exploration path efficiently instead of being searched separately.",
      "A word can't reuse the same grid cell twice within its own path.",
      "Words in the list that simply don't exist anywhere in the grid must correctly be excluded from the results.",
    ],
  },

  // ---------------- HEAP ----------------
  {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Heap",
    patternId: "heap",
    types: ["Heap", "Hash Map"],
    problem:
      "Given a list of numbers and an integer k, return the k most frequently occurring numbers in the list.",
    simpleExplanation:
      "First count how often each number appears using a hash map. Then keep only the k numbers with the highest counts — a heap of size k is a fast way to track 'the current top k' as you go.",
    hints: [
      "Count the frequency of every number in the list using a hash map.",
      "Use a min-heap of size k: add each number's (count, value) pair, and whenever the heap grows past size k, remove the smallest one.",
      "Once you've processed every number, whatever remains in the heap are your k most frequent elements.",
    ],
    samples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]", explanation: "1 appears 3 times and 2 appears 2 times — the two most frequent values." },
      { input: "nums = [1], k = 1", output: "[1]", explanation: "With only one distinct value, it is automatically the most frequent (and only) result." },
      { input: "nums = [4,4,4,6,6,7], k = 1", output: "[4]", explanation: "4 appears 3 times, more than any other value, making it the single most frequent element." },
    ],
    edgeCases: [
      "k equal to the total number of distinct values — the answer is simply every distinct value.",
      "Multiple values tied for the same frequency — any valid combination satisfying k is usually accepted.",
      "A list with only one distinct value repeated many times still works correctly.",
    ],
  },
  {
    id: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    category: "Heap",
    patternId: "heap",
    types: ["Heap", "Design"],
    problem:
      "Design a structure that supports adding numbers one at a time from a stream, and finding the current median of all numbers added so far, at any point.",
    simpleExplanation:
      "Keep two heaps: a max-heap holding the smaller half of the numbers, and a min-heap holding the larger half. Keep them balanced in size — the median is then either the top of one heap, or the average of both tops.",
    hints: [
      "Maintain two heaps: a max-heap for the smaller half of all numbers seen so far, and a min-heap for the larger half.",
      "When adding a new number, put it into the appropriate heap based on its value, then rebalance so the two heaps never differ in size by more than 1.",
      "To find the median: if the heaps are equal size, average their two top values; if one heap has one extra element, its top is the median.",
    ],
    samples: [
      { input: "addNum(1); addNum(2); findMedian()", output: "1.5", explanation: "With the numbers 1 and 2 added, the median is their average: (1+2)/2 = 1.5." },
      { input: "addNum(3); findMedian()", output: "2", explanation: "With 1, 2, 3 now added, the middle value is simply 2." },
      { input: "addNum(1); findMedian()", output: "1", explanation: "With just one number added so far, the median is that number itself." },
    ],
    edgeCases: [
      "Finding the median before any numbers have been added at all needs sensible handling (often undefined or an error).",
      "An even count of numbers added means the median is the average of the two middle values, not a single value.",
      "Numbers can arrive in any order (not sorted) — the two-heap approach handles this without needing to re-sort everything each time.",
    ],
  },
];
