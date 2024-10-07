function mergesort(nums) {
  if (nums.length <= 1) {
    return nums;
  }

  const leftHalf = mergesort(nums.slice(0, Math.floor(nums.length / 2)));
  const rightHalf = mergesort(nums.slice(Math.floor(nums.length / 2)));

  let i = 0;
  while (leftHalf.length !== 0 || rightHalf.length !== 0) {
    nums[i] =
      leftHalf[0] > rightHalf[0] || leftHalf[0] == undefined
        ? rightHalf.shift()
        : leftHalf.shift();
    i++;
  }
  return nums;
}

console.log(mergesort([5,1,4,2,3,100]));
