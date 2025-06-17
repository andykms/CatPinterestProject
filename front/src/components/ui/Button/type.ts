export default interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
}