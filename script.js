function mincost(arr) {
    if (arr.length === 1) return 0; // Only one rope, no cost to connect

    // Helper function to build the min-heap
    function buildHeap(array) {
        for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
            heapify(array, i, array.length);
        }
    }

    // Helper function to maintain the heap property
    function heapify(array, index, heapSize) {
        let smallest = index;
        let left = 2 * index + 1;
        let right = 2 * index + 2;

        if (left < heapSize && array[left] < array[smallest]) smallest = left;
        if (right < heapSize && array[right] < array[smallest]) smallest = right;

        if (smallest !== index) {
            [array[index], array[smallest]] = [array[smallest], array[index]];
            heapify(array, smallest, heapSize);
        }
    }

    // Extract the minimum element from the heap
    function extractMin(array) {
        if (array.length === 0) return null;
        if (array.length === 1) return array.pop();
        const root = array[0];
        array[0] = array.pop();
        heapify(array, 0, array.length);
        return root;
    }

    // Insert a new element into the heap
    function insertHeap(array, value) {
        array.push(value);
        let index = array.length - 1;
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (array[index] < array[parent]) {
                [array[index], array[parent]] = [array[parent], array[index]];
                index = parent;
            } else break;
        }
    }

    buildHeap(arr);
    let totalCost = 0;

    while (arr.length > 1) {
        const first = extractMin(arr);
        const second = extractMin(arr);
        const cost = first + second;
        totalCost += cost;
        insertHeap(arr, cost);
    }

    return totalCost;
}

// Examples
console.log(mincost([4, 3, 2, 6])); // Output: 29
console.log(mincost([1, 2, 3, 4, 5])); // Output: 33
