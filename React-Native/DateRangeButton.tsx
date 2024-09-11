import { CalendarDays } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button, Text, View } from 'tamagui';

const SelectDateRange = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    if (isSelectingStartDate) {
      setStartDate(date);
      setIsSelectingStartDate(false);
      showDatePicker(); // Mostra o date picker novamente para a data final
      Alert.alert('Data Inicial Selecionada:', date.toDateString());
    } else {
      if (startDate && date < startDate) {
        Alert.alert('Erro', 'A data final deve ser posterior à data inicial');
      } else {
        setEndDate(date);
        Alert.alert('Data Final Selecionada:', date.toDateString());
      }
      hideDatePicker(); // Fecha o date picker após selecionar a data final
      setIsSelectingStartDate(true); // Reseta para que a próxima seleção seja a data inicial novamente
    }
  };

  return (
    <View width={'60%'} >
      <Button 
        color={'#fff'} 
        width={'100%'} 
        justifyContent='space-between' 
        onPress={showDatePicker}
      >
        <Text>
          {startDate && endDate 
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` 
            : 'Selecionar Data Início e Fim'}
        </Text>
        {/* <CalendarDays color={'black'} /> */}
      </Button>

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