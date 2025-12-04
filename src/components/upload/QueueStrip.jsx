import { Box, Paper, IconButton, LinearProgress, Chip, Typography } from '@mui/material';
import { Close, Refresh } from '@mui/icons-material';
import { useUploadStore } from '../../store/uploadStore';

/**
 * Queue Strip Component
 * Horizontal scrollable thumbnail queue with upload status
 */
const QueueStrip = () => {
  const { queue, removeFromQueue, retryUpload } = useUploadStore();

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return '#2E7D32';
      case 'uploading':
        return '#0D1B2A';
      case 'failed':
        return '#D32F2F';
      default:
        return '#E0E0E0';
    }
  };

  // Get status label
  const getStatusLabel = (item) => {
    switch (item.status) {
      case 'done':
        return 'Uploaded';
      case 'uploading':
        return `${Math.round(item.progress)}%`;
      case 'failed':
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        border: '1px solid #E0E0E0',
        borderRadius: 2,
      }}
    >
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
        Upload Queue ({queue.length})
      </Typography>

      {/* Horizontal scrollable thumbnails */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#F5F5F5',
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#BDBDBD',
            borderRadius: 3,
          },
        }}
      >
        {queue.map((item) => (
          <Box
            key={item.id}
            sx={{
              position: 'relative',
              minWidth: 100,
              width: 100,
              flexShrink: 0,
            }}
          >
            {/* Thumbnail */}
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: 1,
                overflow: 'hidden',
                border: '2px solid',
                borderColor: getStatusColor(item.status),
                position: 'relative',
              }}
            >
              <img
                src={item.preview}
                alt="Upload preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Overlay for uploading */}
              {item.status === 'uploading' && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: 'white', fontWeight: 600, fontSize: '14px' }}
                  >
                    {Math.round(item.progress)}%
                  </Typography>
                </Box>
              )}

              {/* Remove button */}
              {item.status !== 'uploading' && (
                <IconButton
                  size="small"
                  onClick={() => removeFromQueue(item.id)}
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    width: 24,
                    height: 24,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                  }}
                >
                  <Close sx={{ fontSize: 16 }} />
                </IconButton>
              )}

              {/* Retry button for failed */}
              {item.status === 'failed' && (
                <IconButton
                  size="small"
                  onClick={() => retryUpload(item.id)}
                  sx={{
                    position: 'absolute',
                    bottom: 2,
                    right: 2,
                    backgroundColor: '#D32F2F',
                    color: 'white',
                    width: 24,
                    height: 24,
                    '&:hover': {
                      backgroundColor: '#B71C1C',
                    },
                  }}
                >
                  <Refresh sx={{ fontSize: 16 }} />
                </IconButton>
              )}
            </Box>

            {/* Status bar */}
            <Box
              sx={{
                mt: 0.5,
                height: 3,
                backgroundColor: '#E0E0E0',
                borderRadius: 1.5,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${item.status === 'done' ? 100 : item.progress}%`,
                  backgroundColor: getStatusColor(item.status),
                  transition: 'width 0.3s',
                }}
              />
            </Box>

            {/* Status label */}
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                mt: 0.5,
                fontSize: '11px',
                color: getStatusColor(item.status),
                fontWeight: 600,
              }}
            >
              {getStatusLabel(item)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Overall progress */}
      {queue.some((item) => item.status === 'uploading') && (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Overall Progress
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {queue.filter((i) => i.status === 'done').length} / {queue.length}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(queue.filter((i) => i.status === 'done').length / queue.length) * 100}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: '#E0E0E0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#2E7D32',
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default QueueStrip;
