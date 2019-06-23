/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/bootstrap/index.d.ts" />

let data = {
  bmi: 0,
  height: 0,
  maxWeight: 0,
  minWeight: 0,
  normalHeight: 0,
  normalWeight: 0,
  weight: 0,
};

function ShowResults(
  bmiValue: boolean,
  summery: boolean,
  normalWeight: boolean,
  yourWeightIsNormalOn: boolean,
  howToHealthy: boolean,
  howToUnhealthy: boolean,
  referenceTable: boolean) {
  $('#bmi_checker_results__bmi_value').css('display', bmiValue ? 'block' : 'none');
  $('#bmi_checker_results__summery').css('display', summery ? 'block' : 'none');
  $('#bmi_checker_results__normal_weight').css('display', normalWeight ? 'block' : 'none');
  $('#bmi_checker_results__your_weight_is_normal_on').css('display', yourWeightIsNormalOn ? 'block' : 'none');
  $('#bmi_checker_results__how_to_healthy').css('display', howToHealthy ? 'block' : 'none');
  $('#bmi_checker_results__how_to_unhealthy').css('display', howToUnhealthy ? 'block' : 'none');
  $('#bmi_checker_reference_table').css('display', referenceTable ? 'block' : 'none');
}

function GetWeightFromHeightAndBmi(height: number, bmi: number): number {
  return height * height * bmi;
}

function BmiCheckerInitialize() {
  ShowResults(false, false, false, false, false, false, false);
}

function CommonResult() {
  $('.bmi_value_span').text(data.bmi.toFixed(2));
  $('.bmi_normal_weight_span').text(data.normalWeight.toFixed(2));
  $('.bmi_your_weight_is_normal_on').text(data.normalHeight.toFixed(2));
  $('.bmi_checker_reference_table__your_height').text(data.height.toFixed(2));
  $('.bmi_table_1_to').text(GetWeightFromHeightAndBmi(data.height / 100, 18.5).toFixed(2));
  $('.bmi_table_2_from').text(GetWeightFromHeightAndBmi(data.height / 100, 18.5).toFixed(2));
  $('.bmi_table_2_to').text(GetWeightFromHeightAndBmi(data.height / 100, 25).toFixed(2));
  $('.bmi_table_3_from').text(GetWeightFromHeightAndBmi(data.height / 100, 25).toFixed(2));
  $('.bmi_table_3_to').text(GetWeightFromHeightAndBmi(data.height / 100, 30).toFixed(2));
  $('.bmi_table_4_from').text(GetWeightFromHeightAndBmi(data.height / 100, 30).toFixed(2));
  $('.bmi_table_4_to').text(GetWeightFromHeightAndBmi(data.height / 100, 35).toFixed(2));
  $('.bmi_table_5_from').text(GetWeightFromHeightAndBmi(data.height / 100, 35).toFixed(2));
  $('.bmi_table_5_to').text(GetWeightFromHeightAndBmi(data.height / 100, 40).toFixed(2));
  $('.bmi_table_6_from').text(GetWeightFromHeightAndBmi(data.height / 100, 40).toFixed(2));

  $('.bmi_table_1,.bmi_table_2,.bmi_table_3,.bmi_table_4,.bmi_table_5,.bmi_table_6')
    .removeClass('bmi_table__you_are_here');

  if (data.bmi < 18.5) {
    $('.bmi_table_1').addClass('bmi_table__you_are_here');
  } else if (data.bmi < 25) {
    $('.bmi_table_2').addClass('bmi_table__you_are_here');
  } else if (data.bmi < 30) {
    $('.bmi_table_3').addClass('bmi_table__you_are_here');
  } else if (data.bmi < 35) {
    $('.bmi_table_4').addClass('bmi_table__you_are_here');
  } else if (data.bmi < 40) {
    $('.bmi_table_5').addClass('bmi_table__you_are_here');
  } else {
    $('.bmi_table_6').addClass('bmi_table__you_are_here');
  }
}

function BmiResult1() {
  ShowResults(true, true, true, true, true, false, true);
  $('.bmi_summery_span').text('痩せすぎです。');
  $('#bmi_checker_results__how_to_healthy')
    .text('あなたが痩せすぎでなくなるためには、あと' + (data.minWeight - data.weight).toFixed(2) + 'kg太る必要があります。');
}

function BmiResult2() {
  ShowResults(true, true, true, true, false, true, true);
  $('.bmi_summery_span').text('普通です。');
  $('#bmi_checker_results__how_to_unhealthy')
    .text(
      'あなたはあと' + (data.maxWeight - data.weight).toFixed(2)
      + 'kg太ると肥満になります。あと' + (data.weight - data.minWeight).toFixed(2)
      + 'kg痩せると痩せすぎになります。',
    );
}

function BmiResult3() {
  ShowResults(true, true, true, true, true, false, true);
  $('.bmi_summery_span').text('普通に太っています。（肥満１）');
  $('#bmi_checker_results__how_to_healthy')
    .text('あなたが肥満でなくなるためには、あと' + (data.weight - data.maxWeight).toFixed(2) + 'kg痩せる必要があります。');
}

function BmiResult4() {
  ShowResults(true, true, true, true, true, false, true);
  $('.bmi_summery_span').text('結構太っています。（肥満２）');
  $('#bmi_checker_results__how_to_healthy')
    .text('あなたが肥満でなくなるためには、あと' + (data.weight - data.maxWeight).toFixed(2) + 'kg痩せる必要があります。');
}

function BmiResult5() {
  ShowResults(true, true, true, true, true, false, true);
  $('.bmi_summery_span').text('かなーり太っています。（肥満３）');
  $('#bmi_checker_results__how_to_healthy')
    .text('あなたが肥満でなくなるためには、あと' + (data.weight - data.maxWeight).toFixed(2) + 'kg痩せる必要があります。');
}

function BmiResult6() {
  ShowResults(true, true, true, true, true, false, true);
  $('.bmi_summery_span').text('やばいくらい太っています。（肥満４）');
  $('#bmi_checker_results__how_to_healthy')
    .text('あなたが肥満でなくなるためには、あと' + (data.weight - data.maxWeight).toFixed(2) + 'kg痩せる必要があります。');
}

function DoCalc() {
  data.height = Number($('input[name=height_input]').val());
  data.weight = Number($('input[name=weight_input]').val());
  const heightInMeter: number = data.height / 100;
  data.bmi = data.weight / (heightInMeter * heightInMeter);
  data.normalHeight = 100 * Math.sqrt(data.weight / 22);
  data.normalWeight = heightInMeter * heightInMeter * 22;
  data.minWeight = heightInMeter * heightInMeter * 18.5;
  data.maxWeight = heightInMeter * heightInMeter * 25;

  CommonResult();

  if (data.bmi < 18.5) {
    BmiResult1();
  } else if (data.bmi < 25) {
    BmiResult2();
  } else if (data.bmi < 30) {
    BmiResult3();
  } else if (data.bmi < 35) {
    BmiResult4();
  } else if (data.bmi < 40) {
    BmiResult5();
  } else if (40 < data.bmi) {
    BmiResult6();
  }
}

$(() => {
  BmiCheckerInitialize();
});
