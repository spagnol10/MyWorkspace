import { CalendarDays } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button, Text, View } from 'tamagui';

const SelectDateRange = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const showDatePicker = (isStartDate: boolean) => {
    setIsSelectingStartDate(isStartDate);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    if (isSelectingStartDate) {
      setStartDate(date);
      Alert.alert('Data Inicial Selecionada:', date.toDateString());
    } else {
      if (startDate && date < startDate) {
        Alert.alert('Erro', 'A data final deve ser posterior à data inicial');
      } else {
        setEndDate(date);
        Alert.alert('Data Final Selecionada:', date.toDateString());
      }
    }
    hideDatePicker();
  };

  return (
    <View width={'40%'}>
      {/* Botão para selecionar a data inicial */}
      <Button 
        color={'#fff'} 
        width={'100%'} 
        justifyContent='space-between' 
        onPress={() => showDatePicker(true)} 
      >
        <Text>{startDate ? startDate.toDateString() : 'Data Inicial'}</Text>
        <CalendarDays color={'black'} />
      </Button>

      {/* Botão para selecionar a data final */}
      <Button 
        color={'#fff'} 
        width={'100%'} 
        justifyContent='space-between' 
        onPress={() => showDatePicker(false)} 
        disabled={!startDate} // Desabilitado até que uma data inicial seja selecionada
      >
        <Text>{endDate ? endDate.toDateString() : 'Data Final'}</Text>
        <CalendarDays color={'black'} />
      </Button>

      {/* DateTimePickerModal para selecionar as datas */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        locale="pt-BR"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default SelectDateRange;