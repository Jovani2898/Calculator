import React, {useState} from 'react';
import {Buttons} from '../buttons/Buttons';
import {View, Text} from 'react-native';
import {Styles} from '../styles/Styles';
import {Colors} from '../styles/Colors';

export const Keyboard = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [calculation, setCalculation] = useState<Number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  console.log(firstNumber, 'first number');

  // когда юзер нажимает на цифру то она сохраняется в fistNumber,
  // после выбора операции secondNumber берёт значение firstNumber-а
  // соответсвено то число которое мы выбираем после выбора операции сохраняется в firstNumber, а первое в secondNumber-е
  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber(''); //обновляем firstNumber для того чтобы  он стал 0 и мы могли вписать второе число.
  };

  console.log(secondNumber, 'second number');

  const onPlusMinusPress = () => {
    setCalculation(parseInt(firstNumber, 10) * -1);
  };

  const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('');
    setCalculation(null);
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
    } else if (firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
    } else if (firstNumber === '') {
      return <Text style={Styles.screenFirstNumber}>{'0'}</Text>;
    } else if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, {fontSize: 70}]}>
          {firstNumber}
        </Text>
      );
    } else if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, {fontSize: 50}]}>
          {firstNumber}
        </Text>
      );
    }
  };

  const getCalculation = () => {
    switch (operation) {
      case '+':
        clear();
        setCalculation(parseInt(secondNumber, 10) + parseInt(firstNumber, 10));

        break;
      case '-':
        clear();
        setCalculation(parseInt(secondNumber, 10) - parseInt(firstNumber, 10));
        break;
      case '*':
        clear();
        setCalculation(parseInt(secondNumber, 10) * parseInt(firstNumber, 10));
        break;
      case '/':
        clear();
        setCalculation(parseInt(secondNumber, 10) / parseInt(firstNumber, 10));
        break;
      case '%':
        clear();
        setCalculation(
          (parseInt(secondNumber, 10) / 100) * parseInt(firstNumber, 10),
        );
        break;
      case '+/-':
        clear();
        setSecondNumber((parseInt(secondNumber, 10) * -1).toString());
        break;
      default:
        clear();
        setCalculation(0);
        break;
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View style={Styles.displayNumber}>
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}
          <Text style={Styles.displayNumberText}>{operation}</Text>
        </Text>
        {numberDisplay()}
      </View>
      <View style={Styles.row}>
        <Buttons title="C" isGray onPress={clear} />
        <Buttons title="+/-" isGray onPress={() => onPlusMinusPress()} />
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
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))} //from the first to the last element, -1 points to the last element of the array
        />
        <Buttons title="=" isBlue onPress={() => getCalculation()} />
      </View>
    </View>
  );
};
