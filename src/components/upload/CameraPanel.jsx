import { useRef } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { CameraAlt, Image } from '@mui/icons-material';
import { useUploadStore } from '../../store/uploadStore';

/**
 * Camera Panel Component
 * Provides camera and gallery upload buttons
 */
const CameraPanel = () => {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const { addToQueue, addMultipleToQueue } = useUploadStore();

  // Handle camera capture
  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      addToQueue(file);
      
      // Haptic feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
    e.target.value = ''; // Reset input
  };

  // Handle gallery selection
  const handleGalleryUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      addMultipleToQueue(files);
    }
    e.target.value = ''; // Reset input
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 2,
        border: '1px solid #E0E0E0',
        borderRadius: 2,
      }}
    >
      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        style={{ display: 'none' }}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleGalleryUpload}
        style={{ display: 'none' }}
      />

      {/* Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Camera Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={() => cameraInputRef.current?.click()}
          startIcon={<CameraAlt />}
          sx={{
            py: 2,
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none',
            backgroundColor: '#0D1B2A',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(13, 27, 42, 0.2)',
            '&:hover': {
              backgroundColor: '#1B263B',
              boxShadow: '0 4px 12px rgba(13, 27, 42, 0.3)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          Take Photo
        </Button>

        {/* Gallery Button */}
        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={() => galleryInputRef.current?.click()}
          startIcon={<Image />}
          sx={{
            py: 2,
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none',
            borderColor: '#0D1B2A',
            color: '#0D1B2A',
            borderRadius: 2,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'rgba(13, 27, 42, 0.04)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          Upload from Gallery
        </Button>
      </Box>
    </Paper>
  );
};

export default CameraPanel;
