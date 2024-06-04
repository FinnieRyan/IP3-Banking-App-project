import React from 'react';
import { Text } from '../Text/Text';
import {
  Bar,
  BarAmount,
  BarLabel,
  IncomeSpentContainer,
} from './IncomeSpent.style';

export const IncomeSpent = ({ income, spent }) => {
  const total = income + spent;
  const incomePercentage = total !== 0 ? (income / total) * 100 : 0;
  const spentPercentage = total !== 0 ? (spent / total) * 100 : 0;

  return (
    <IncomeSpentContainer>
      <BarLabel>
        <Text>Income</Text>
        <BarAmount>
          <Bar $type="income" percentage={incomePercentage} />
          <Text size={2} weight="medium">
            £{income}
          </Text>
        </BarAmount>
      </BarLabel>
      <BarLabel>
        <Text>Spent</Text>
        <BarAmount>
          <Bar $type="spent" percentage={spentPercentage} />
          <Text size={2} weight="medium">
            £{spent}
          </Text>
        </BarAmount>
      </BarLabel>
    </IncomeSpentContainer>
  );
};
