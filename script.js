let price = 4;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const input = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDiv = document.getElementById("change-due");
const cidDiv = document.getElementById("cid");
const cashier = document.getElementById("cash-amount");
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let cashInDrawerReversed = [...cid].reverse();
let valueOfMoneyArray = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
let countOfEachMoneyTypeObject = {};
let moneyTypeWithNameObject = {};
let changeWithoutEdit;
let totalAmountInCid;
let change;
let helper = [];
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
showingDrawerInDisplay();
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
purchaseBtn.addEventListener("click", () => {
  //reset cashier display
  cashier.innerHTML = "";
  //reset the change display
  changeDiv.innerHTML = "";
  // declaring the change
  let change = (input.value - price).toFixed(2);

  countOfEachMoneyType(cid, valueOfMoneyArray);

  moneyTypeWithName(cid, valueOfMoneyArray);

  if (input.value < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (input.value == price) {
    changeDiv.innerHTML = "No change due - customer paid with exact cash";
  } else {
    changeWithoutEdit = Number((input.value - price).toFixed(2));
    calculatTotalAmountInCid();
    if (changeWithoutEdit === totalAmountInCid) {
      changeDiv.innerHTML = "<p>Status: CLOSED</p> ";
      handlePurchase();
      lastCheck();
    }
    if (changeWithoutEdit !== totalAmountInCid) {
      changeDiv.innerHTML = "<p>Status: OPEN</p>";
      handlePurchase();
      lastCheck();
    }
  }
  input.value = "";
  change = 0;
  changeWithoutEdit = 0;
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function handlePurchase() {
  let resultArray = [];

  change = Number((input.value - price).toFixed(2));

  let valueOfMoneyArrayReversed = [...valueOfMoneyArray].reverse();

  valueOfMoneyArrayReversed.forEach((valueOfMoney, index) => {
    if (change % valueOfMoney !== change) {
      let countInChange = Math.floor(Number(change.toFixed(2)) / valueOfMoney);

      if (countOfEachMoneyTypeObject[`${valueOfMoney}`] >= countInChange) {
        resultArray.push([valueOfMoney, valueOfMoney * countInChange]);

        change -= valueOfMoney * countInChange;

        cashInDrawerReversed[index][1] -= valueOfMoney * countInChange;
      } else {
        resultArray.push([
          valueOfMoney,
          valueOfMoney * countOfEachMoneyTypeObject[`${valueOfMoney}`],
        ]);

        change -= valueOfMoney * countOfEachMoneyTypeObject[`${valueOfMoney}`];

        cashInDrawerReversed[index][1] -=
          valueOfMoney * countOfEachMoneyTypeObject[`${valueOfMoney}`];
      }
    }
  });
  helper = resultArray;
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function showingDrawerInDisplay() {
  return cashInDrawerReversed.forEach((num) => {
    cashier.innerHTML += `<p>${num}$</p>`;
  });
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function calculatTotalAmountInCid() {
  totalAmountInCid = Number(
    cid
      .map((e) => {
        return (e = e[1]);
      })
      .reduce((pre, cur) => {
        let sum = pre + cur;
        return (pre = sum);
      })
      .toFixed(2)
  );
  return totalAmountInCid;
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function countOfEachMoneyType(arr1, arr2) {
  arr1.forEach((e, i) => {
    return (countOfEachMoneyTypeObject[arr2[i]] = Number(
      (e[1] / arr2[i]).toFixed(2)
    ));
  });
  return countOfEachMoneyTypeObject;
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function moneyTypeWithName(arr1, arr2) {
  arr1.forEach((e, i) => {
    return (moneyTypeWithNameObject[arr2[i]] = e[0]);
  });
  return moneyTypeWithNameObject;
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function calculateSumOfResultArray(array) {
  let sum = Number(
    array
      .map((e) => {
        return (e = e[1]);
      })
      .reduce((pre, cur) => {
        let sum = pre + cur;
        return (pre = sum);
      })
      .toFixed(2)
  );
  console.log(sum);
  return sum;
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function lastCheck() {
  let sumOfResultArray = calculateSumOfResultArray(helper);

  if (sumOfResultArray === changeWithoutEdit) {
    helper.forEach((num) => {
      if (num[1] != 0) {
        changeDiv.innerHTML += `<p>${moneyTypeWithNameObject[`${num[0]}`]}: $${
          num[1]
        }</p> `;
      }
    });
    showingDrawerInDisplay();
  } else {
    changeDiv.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    cashier.innerHTML = "";
  }
}
