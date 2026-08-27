# 28. Binary Search

## Problem

You are given a sorted array of unique integers and a target value. Return the index of the target if it exists in the array, otherwise return -1. Because the array is sorted, you can find the target much faster than checking every element one by one.

## Example 1

### Input

```text
nums = [-1,0,3,5,9,12], target = 9
```

### Expected Output

```text
4
```

### Explanation

9 is found at index 4 in the array.

## Example 2

### Input

```text
nums = [-1,0,3,5,9,12], target = 2
```

### Expected Output

```text
-1
```

### Explanation

2 is not in the array, so we return -1.

## How to Solve

### Key Idea

Since the array is sorted, you can repeatedly cut the search space in half by comparing the target to the middle element.

### Approach

1. Set two pointers, `left` at the start and `right` at the end of the array.
2. While `left <= right`, find the middle index and compare `nums[mid]` to the target.
3. If it matches, return `mid`. If the target is bigger, move `left` past `mid`; if smaller, move `right` before `mid`. Repeat until found or the pointers cross, then return -1.

### Why It Works

Every comparison eliminates half of the remaining elements, since we know which half the target could not be in thanks to the sorted order.

## Visual Explanation

```text
nums =  [-1,  0,  3,  5,  9, 12], target = 9
index:    0   1   2   3   4   5
          L       M           R    -> mid=2, nums[mid]=3 < 9, search right half (left=mid+1)
                      L   M   R    -> mid=4, nums[mid]=9 == target, found!
```

## Optimal Solution

```python
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return -1
```

## Complexity

- **Time:** O(log n)
- **Space:** O(1)

## Real-World Uses

- Looking up a record by key in a sorted database index (B-tree lookups).
- Autocomplete/dictionary lookups against a sorted word list.
- Finding a version or commit in a sorted list of release timestamps.

## Key Takeaway

Binary search is the foundation pattern for this section: whenever data is sorted or has a monotonic property, you can search it in logarithmic time by repeatedly halving the search space.
