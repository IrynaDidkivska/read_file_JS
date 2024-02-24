const btn = document.querySelector(".read__btn");
const fileInput = document.getElementById("file-input");
btn.addEventListener("click", readFile);

function readFile() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = parseFile;
    reader.readAsText(file);
  } else {
    alert("Please select file");
  }
}

function parseFile(e) {
  const fileContent = e.target.result;
  const numArray = fileContent.split("\n").map(Number);

  let min = numArray.reduce((a, b) => Math.min(a, b));
  alert(`Min number: ${min}`);
  let max = numArray.reduce((a, b) => Math.max(a, b));
  alert(`Max number: ${max}`);

  alert(`Median is: ${findMedian(numArray)}`);

  alert(`Arithmetic mean is: ${getMean(numArray)}`);

  console.log("Min number: ", min);
  console.log("Max number: ", max);
  console.log("Median", findMedian(numArray));
  console.log("Arithmetic mean:", getMean(numArray));
  const sequences = findSequences(numArray);
  alert(`Longest Increasing Sequence: ${sequences.longestIncreasing}`);
  alert(`Longest Decreasing Sequence: ${sequences.longestDecreasing}`);
  console.log("Longest Increasing Sequence: ", sequences.longestIncreasing);
  console.log("Longest Decreasing Sequence: ", sequences.longestDecreasing);
}

function findMedian(numArray) {
  const length = numArray.length;
  if (length % 2 === 0) {
    return (numArray[length / 2 - 1] + numArray[length / 2]) / 2;
  } else {
    return numArray[length / 2];
  }
}

function getMean(numArray) {
  const mean = numArray.reduce((sum, num) => sum + num, 0) / numArray.length;
  return mean.toFixed(2);
}

function findSequences(numArray) {
  let longestIncreasing = [];
  let tempIncreasing = [numArray[0]];

  let longestDecreasing = [];
  let tempDecreasing = [numArray[0]];

  for (let i = 1; i < numArray.length; i++) {
    // Для зростаючої послідовності
    if (numArray[i] > numArray[i - 1]) {
      tempIncreasing.push(numArray[i]);
    } else {
      if (tempIncreasing.length > longestIncreasing.length) {
        longestIncreasing = tempIncreasing.slice();
      }
      tempIncreasing = [numArray[i]];
    }

    // Для зменшувальної послідовності
    if (numArray[i] < numArray[i - 1]) {
      tempDecreasing.push(numArray[i]);
    } else {
      if (tempDecreasing.length > longestDecreasing.length) {
        longestDecreasing = tempDecreasing.slice();
      }
      tempDecreasing = [numArray[i]];
    }
  }

  // Перевіряємо останні тимчасові послідовності після завершення циклу
  if (tempIncreasing.length > longestIncreasing.length) {
    longestIncreasing = tempIncreasing;
  }
  if (tempDecreasing.length > longestDecreasing.length) {
    longestDecreasing = tempDecreasing;
  }

  return {
    longestIncreasing,
    longestDecreasing,
  };
}
