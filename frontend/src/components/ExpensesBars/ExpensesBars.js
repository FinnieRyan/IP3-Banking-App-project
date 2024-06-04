import React from 'react';
import { Text } from '../Text/Text';
import {
  Bar,
  BarAmount,
  BarLabel,
  ExpensesContainer,
} from './ExpensesBars.style';

export const ExpensesBars = ({ expenses }) => {
  const total = expenses.reduce((sum, item) => sum + item.value, 0);

  return (
    <ExpensesContainer>
      {expenses.map(({ label, value, color }) => {
        const percentage = total !== 0 ? (value / total) * 100 : 0;
        return (
          <BarLabel key={label}>
            <Text>{label}</Text>
            <BarAmount>
              <Bar $color={color} percentage={percentage} />
              <Text size={2} weight="medium">
                £{value}
              </Text>
            </BarAmount>
          </BarLabel>
        );
      })}
    </ExpensesContainer>
  );
};
