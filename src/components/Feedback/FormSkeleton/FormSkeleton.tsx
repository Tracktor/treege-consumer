import { Box, Skeleton, Stack } from "design-system";

const FormSkeleton = () => (
  <>
    <Skeleton height={56} sx={{ transform: "scale(1, 1)" }} />
    <Skeleton width="60%" height={30} sx={{ transform: "scale(1, 1)" }} />
    <Skeleton height={30} sx={{ transform: "scale(1, 1)" }} />
    <Stack>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Box sx={{ marginRight: 1, marginY: 1 }}>
          <Skeleton variant="circular" width={30} height={30} />
        </Box>
        <Skeleton width="30%" />
      </Box>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Box sx={{ marginRight: 1, marginY: 1 }}>
          <Skeleton variant="circular" width={30} height={30} />
        </Box>
        <Skeleton width="20%" />
      </Box>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Box sx={{ marginRight: 1, marginY: 1 }}>
          <Skeleton variant="circular" width={30} height={30} />
        </Box>
        <Skeleton width="30%" />
      </Box>
    </Stack>

    <Skeleton width="80%" height={30} sx={{ transform: "scale(1, 1)" }} />

    <Stack>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Box sx={{ marginRight: 1, marginY: 1 }}>
          <Skeleton variant="circular" width={30} height={30} />
        </Box>
        <Skeleton width="30%" />
      </Box>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Box sx={{ marginRight: 1, marginY: 1 }}>
          <Skeleton variant="circular" width={30} height={30} />
        </Box>
        <Skeleton width="20%" />
      </Box>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Box sx={{ marginRight: 1, marginY: 1 }}>
          <Skeleton variant="circular" width={30} height={30} />
        </Box>
        <Skeleton width="30%" />
      </Box>
    </Stack>
  </>
);

export default FormSkeleton;
