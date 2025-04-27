export const formatDate = (timestamp: number | undefined) =>
    timestamp ? new Date(timestamp).toISOString().split("T")[0] : "";
  