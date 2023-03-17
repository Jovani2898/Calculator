import React, {useEffect, useState} from 'react';
import {Buttons} from '../buttons/Buttons';
import {View, Text} from 'react-native';
import {Styles} from '../styles/Styles';
import {Colors} from '../styles/Colors';

export const Keyboard = () => {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [operation, setOperation] = useState<string | null>(null);
  const [calculation, setCalculation] = useState<number | null>(null);
  const [floatPart, setFloatPart] = useState<number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    // if (firstNumber < 10) {
    //   setFirstNumber(firstNumber + parseInt(buttonValue, 10));
    // }

    if (buttonValue !== '.' && floatPart === null) {
      if ((firstNumber.toString() + buttonValue).length < 10) {
        calculation !== null && setCalculation(null);
        setFirstNumber(parseInt(firstNumber.toString() + buttonValue, 10));
      }
    } else {
      if (floatPart === null) {
        setFloatPart(0);
      } else {
        if (parseInt(floatPart?.toString() + buttonValue, 10) < 1000) {
          setFloatPart(parseInt(floatPart?.toString() + buttonValue, 10));
        }
      }

      // setFirstNumber(firstNumber);
    }
  };

  console.log(firstNumber, 'first number');

  // когда юзер нажимает на цифру то она сохраняется в fistNumber,
  // после выбора операции secondNumber берёт значение firstNumber-а
  // соответсвено то число которое мы выбираем после выбора операции сохраняется в firstNumber, а первое в secondNumber-е
  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    switch (buttonValue) {
      case '+':
        setSecondNumber(
          parseFloat(
            (floatPart !== null
              ? firstNumber + secondNumber + parseFloat(`0.${floatPart}`)
              : firstNumber + secondNumber
            ).toFixed(4),
          ),
        );
        setFloatPart(null);
        setFirstNumber(0);
        break;
      case '-':
        setSecondNumber(
          floatPart !== null
            ? firstNumber + parseFloat(`0.${floatPart}`) - secondNumber
            : firstNumber - secondNumber,
        );
        setFloatPart(null);
        setFirstNumber(0);
        break;
      case '*':
        setSecondNumber(
          firstNumber !== 0 && secondNumber !== 0
            ? firstNumber * secondNumber
            : firstNumber,
        );
        setFloatPart(null);
        setFirstNumber(0);
        break;
      case '/':
        setSecondNumber(
          firstNumber !== 0 && secondNumber !== 0
            ? secondNumber / firstNumber
            : firstNumber,
        );
        setFloatPart(null);
        setFirstNumber(0);
        break;
      case '%':
        setSecondNumber((secondNumber / 100) * firstNumber);
        setFloatPart(null);
        setFirstNumber(0);
        break;
      case '+/-':
        setFloatPart(null);
        setFirstNumber(firstNumber * -1);
        break;
    }
    // setFirstNumber(0); //обновляем firstNumber для того чтобы  он стал 0 и мы могли вписать второе число.
  };

  console.log(secondNumber, 'second number');

  // const onPlusMinusPress = () => {
  //   setCalculation(firstNumber * -1);
  // };

  const clear = (mode?: string | undefined) => {
    setFirstNumber(0);
    setSecondNumber(0);
    setOperation('');
    setFloatPart(null);
    mode && setCalculation(null);
  };

  const numberDisplay = () => {
    if (calculation !== null) {
      return (
        <Text
          style={
            calculation < 99999
              ? [Styles.screenFirstNumber, {color: Colors.calculation}]
              : [
                  Styles.screenFirstNumber,
                  {fontSize: 50, color: Colors.calculation},
                ]
          }>
          {calculation.toString()}
        </Text>
      );
    } else if (floatPart !== null) {
      if (floatPart < 1000) {
        return (
          <Text style={Styles.screenFirstNumber}>
            {firstNumber + '.' + floatPart}
          </Text>
        );
      }
    } else if (floatPart === null) {
      if (firstNumber < 1000) {
        return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
      } else if (firstNumber === 0) {
        return <Text style={Styles.screenFirstNumber}>{'0'}</Text>;
      } else if (firstNumber > 1000 && firstNumber < 1000000) {
        return (
          <Text style={[Styles.screenFirstNumber, {fontSize: 70}]}>
            {firstNumber}
          </Text>
        );
      } else if (firstNumber > 1000000) {
        return (
          <Text style={[Styles.screenFirstNumber, {fontSize: 50}]}>
            {firstNumber}
          </Text>
        );
      }
    }
  };

  const getCalculation = () => {
    switch (operation) {
      case '+':
        setCalculation(secondNumber + firstNumber);
        clear();
        break;
      case '-':
        setCalculation(secondNumber - firstNumber);
        clear();
        break;
      case '*':
        setCalculation(secondNumber * firstNumber);
        clear();
        break;
      case '/':
        setCalculation(secondNumber / firstNumber);
        clear();
        break;
      case '%':
        setCalculation((secondNumber / 100) * firstNumber);
        clear();
        break;
      default:
        break;
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View style={Styles.displayNumber}>
        <Text style={Styles.screenSecondNumber}>
          {calculation === null && secondNumber}
          <Text style={Styles.displayNumberText}>
            {operation !== '+/-' && operation}
          </Text>
        </Text>
        {numberDisplay()}
      </View>
      <View style={Styles.row}>
        <Buttons title="C" isGray onPress={() => clear('full')} />
        <Buttons
          title="+/-"
          isGray
          onPress={() => handleOperationPress('+/-')}
        />
        <Buttons title="%" isGray onPress={() => handleOperationPress('%')} />
        <Buttons title="÷" isBlue onPress={() => handleOperationPress('/')} />
      </View>
      <View style={Styles.row}>
        <Buttons title="7" onPress={() => handleNumberPress('7')} />
        <Buttons title="8" onPress={() => handleNumberPress('8')} />
        <Buttons title="9" onPress={() => handleNumberPress('9')} />
        <Buttons title="x" isBlue onPress={() => handleOperationPress('*')} />
      </View>
      <View style={Styles.row}>
        <Buttons title="4" onPress={() => handleNumberPress('4')} />
        <Buttons title="5" onPress={() => handleNumberPress('5')} />
        <Buttons title="6" onPress={() => handleNumberPress('6')} />
        <Buttons title="-" isBlue onPress={() => handleOperationPress('-')} />
      </View>
      <View style={Styles.row}>
        <Buttons title="1" onPress={() => handleNumberPress('1')} />
        <Buttons title="2" onPress={() => handleNumberPress('2')} />
        <Buttons title="3" onPress={() => handleNumberPress('3')} />
        <Buttons title="+" isBlue onPress={() => handleOperationPress('+')} />
      </View>
      <View style={Styles.row}>
        <Buttons title="." onPress={() => handleNumberPress('.')} />
        <Buttons title="0" onPress={() => handleNumberPress('0')} />
        <Buttons
          title="⌫"
          onPress={() => setFirstNumber(Math.floor(firstNumber / 10))} //from the first to the last element, -1 points to the last element of the array
        />
        <Buttons title="=" isBlue onPress={() => getCalculation()} />
      </View>
    </View>
  );
};
