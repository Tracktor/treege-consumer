import { Divider, Typography } from "@tracktor/design-system";

interface TitleProps {
  label?: string;
  disableDivider?: boolean;
}

const Title = ({ label, disableDivider }: TitleProps) => (
  <>
    {!disableDivider && <Divider sx={{ mb: 10, mt: 6 }} />}
    <Typography variant="h3">{label}</Typography>
  </>
);

export default Title;
