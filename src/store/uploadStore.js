import { create } from 'zustand';

/**
 * Upload Store - Manages upload queue and metadata state
 */
export const useUploadStore = create((set, get) => ({
  // Queue of files to upload
  queue: [],
  
  // Metadata
  selectedProject: '',
  selectedMilestone: '',
  geolocation: null,
  
  // Upload state
  isUploading: false,
  uploadProgress: {},
  
  // Add file to queue
  addToQueue: (file) => {
    const id = Date.now() + Math.random();
    const newItem = {
      id,
      file,
      preview: URL.createObjectURL(file),
      status: 'pending', // pending, uploading, done, failed
      progress: 0,
      error: null,
    };
    set((state) => ({ queue: [...state.queue, newItem] }));
    
    // Auto-start upload if metadata is set
    const { selectedProject, selectedMilestone } = get();
    if (selectedProject && selectedMilestone) {
      get().startUpload(id);
    }
  },
  
  // Add multiple files
  addMultipleToQueue: (files) => {
    const newItems = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
      progress: 0,
      error: null,
    }));
    set((state) => ({ queue: [...state.queue, ...newItems] }));
    
    // Auto-start uploads if metadata is set
    const { selectedProject, selectedMilestone } = get();
    if (selectedProject && selectedMilestone) {
      newItems.forEach((item) => get().startUpload(item.id));
    }
  },
  
  // Remove from queue
  removeFromQueue: (id) => {
    set((state) => ({
      queue: state.queue.filter((item) => item.id !== id),
    }));
  },
  
  // Start upload for a specific item
  startUpload: async (id) => {
    const item = get().queue.find((i) => i.id === id);
    if (!item || item.status === 'uploading' || item.status === 'done') return;
    
    // Update status to uploading
    set((state) => ({
      queue: state.queue.map((i) =>
        i.id === id ? { ...i, status: 'uploading', progress: 0 } : i
      ),
    }));
    
    try {
      // Mock upload with progress simulation
      await get().mockUpload(id);
      
      // Mark as done
      set((state) => ({
        queue: state.queue.map((i) =>
          i.id === id ? { ...i, status: 'done', progress: 100 } : i
        ),
      }));
    } catch (error) {
      // Mark as failed
      set((state) => ({
        queue: state.queue.map((i) =>
          i.id === id ? { ...i, status: 'failed', error: error.message } : i
        ),
      }));
    }
  },
  
  // Mock upload function (replace with real API)
  mockUpload: (id) => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // 10% chance of failure for demo
          if (Math.random() < 0.1) {
            reject(new Error('Upload failed'));
          } else {
            resolve();
          }
        }
        
        set((state) => ({
          queue: state.queue.map((i) =>
            i.id === id ? { ...i, progress: Math.min(progress, 100) } : i
          ),
        }));
      }, 200);
    });
  },
  
  // Retry failed upload
  retryUpload: (id) => {
    set((state) => ({
      queue: state.queue.map((i) =>
        i.id === id ? { ...i, status: 'pending', error: null, progress: 0 } : i
      ),
    }));
    get().startUpload(id);
  },
  
  // Set project
  setProject: (projectId) => {
    set({ selectedProject: projectId, selectedMilestone: '' });
  },
  
  // Set milestone
  setMilestone: (milestoneId) => {
    set({ selectedMilestone: milestoneId });
    
    // Start pending uploads
    const { queue } = get();
    queue.forEach((item) => {
      if (item.status === 'pending') {
        get().startUpload(item.id);
      }
    });
  },
  
  // Set geolocation
  setGeolocation: (coords) => {
    set({ geolocation: coords });
  },
  
  // Clear completed items
  clearCompleted: () => {
    set((state) => ({
      queue: state.queue.filter((item) => item.status !== 'done'),
    }));
  },
  
  // Reset queue
  resetQueue: () => {
    set({ queue: [] });
  },
}));
