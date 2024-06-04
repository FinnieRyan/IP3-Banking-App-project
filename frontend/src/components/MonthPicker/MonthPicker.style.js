import styled from 'styled-components';

export const MonthPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: -30px;
`;

export const Months = styled.ul`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const Month = styled.li`
  flex: 0 0 auto;
  padding: 0 16px;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? 'bold' : '400')};
  font-size: ${(props) => (props.$active ? '24px' : '18px')};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textBlack};
  transition: opacity 0.3s;
  scroll-snap-align: center;
`;

export const Spacer = styled.div`
  flex: 0 0 auto;
  width: 50%;
`;

export const Fader = styled.div`
  position: relative;
  top: -30px;
  width: 100%;
  height: 30px;
  background: linear-gradient(
    90deg,
    rgba(239, 243, 248, 1) 0%,
    rgba(239, 243, 248, 0) 35%,
    rgba(239, 243, 248, 0) 75%,
    rgba(239, 243, 248, 1) 100%
  );
  pointer-events: none;
`;
