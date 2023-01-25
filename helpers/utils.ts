export function countElementsWithMatchingTypes(obj: Object, expectedType: string) : number {
    let n = 0;
    Object.values(obj).forEach((value) => {
        if (typeof value === expectedType) {
            n++
        }
    });

    return n;
};

export function CheckIfObjectContainsStringArray(arr: Array<String>) : boolean {
    for (let item of arr) {
        if (typeof item !== "string") {
            return false;
        }
    }

    return true;
}

export function SumIngredients(arr: Array<Object>){
  return arr.reduce((accumulator, object) => {
    return accumulator + object["amount"]["value"];
  }, 0);
}

export function IsAscendingById(arr: Array<any>): boolean {
  arr = arr.map((obj: { id: any; }) => obj.id);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i+1] <= arr[i]) {
      return false;
    }
  }
  return true;
}