import { Divider, Typography } from "@tracktor/design-system";

interface TitleProps {
  label?: string;
  isRoot?: boolean;
}

const Title = ({ label, isRoot }: TitleProps) => (
  <>
    {!isRoot && <Divider sx={{ mb: 8 }} />}
    <Typography variant="h3">{label}</Typography>
  </>
);

export default Title;
