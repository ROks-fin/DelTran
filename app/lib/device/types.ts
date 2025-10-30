/**
 * Ultra-Premium Device Detection Types
 * Comprehensive type definitions for device capabilities
 */

export type DeviceType =
  | 'mobile'
  | 'tablet'
  | 'laptop'
  | 'desktop'
  | 'tv'
  | 'watch'
  | 'car'
  | 'vr'
  | 'ar';

export type OSType =
  | 'ios'
  | 'android'
  | 'windows'
  | 'macos'
  | 'linux'
  | 'tvos'
  | 'wearos'
  | 'chromeos'
  | 'unknown';

export type BrowserType =
  | 'chrome'
  | 'firefox'
  | 'safari'
  | 'edge'
  | 'opera'
  | 'brave'
  | 'samsung'
  | 'unknown';

export type ConnectionType =
  | 'slow-2g'
  | '2g'
  | '3g'
  | '4g'
  | '5g'
  | 'wifi'
  | 'ethernet'
  | 'unknown';

export type ColorGamut = 'srgb' | 'p3' | 'rec2020';

export type RefreshRate = 60 | 90 | 120 | 144 | 240;

export type Orientation = 'portrait' | 'landscape';

export interface ScreenInfo {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
  pixelRatio: number;
  orientation: Orientation;
  colorGamut: ColorGamut;
  colorDepth: number;
  hdr: boolean;
  refreshRate: RefreshRate;
  isRetina: boolean;
}

export interface InputCapabilities {
  touch: boolean;
  mouse: boolean;
  pen: boolean;
  keyboard: boolean;
  voice: boolean;
  gamepad: boolean;
  touchPoints: number;
  coarsePointer: boolean;
  finePointer: boolean;
}

export interface ConnectionInfo {
  type: ConnectionType;
  effectiveType: ConnectionType;
  downlink: number; // Mbps
  downlinkMax: number; // Mbps
  rtt: number; // Round-trip time in ms
  saveData: boolean;
  online: boolean;
}

export interface HardwareCapabilities {
  // Graphics
  webgl: boolean;
  webgl2: boolean;
  webgpu: boolean;

  // Canvas
  canvas: boolean;
  offscreenCanvas: boolean;

  // Storage
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;

  // Workers
  serviceWorker: boolean;
  sharedWorker: boolean;
  webWorker: boolean;

  // Multimedia
  webRTC: boolean;
  mediaRecorder: boolean;
  pictureInPicture: boolean;

  // Advanced
  sharedArrayBuffer: boolean;
  webAssembly: boolean;

  // Network
  pushNotifications: boolean;
  webSocket: boolean;

  // Device APIs
  bluetooth: boolean;
  nfc: boolean;
  usb: boolean;
  midi: boolean;

  // Sensors
  gyroscope: boolean;
  accelerometer: boolean;
  magnetometer: boolean;
  ambientLight: boolean;
  proximity: boolean;

  // Output
  vibration: boolean;
  speechSynthesis: boolean;

  // Input
  speechRecognition: boolean;

  // Location
  geolocation: boolean;

  // Media
  camera: boolean;
  microphone: boolean;

  // XR
  webxr: boolean;
  webxrAR: boolean;
  webxrVR: boolean;
}

export interface PerformanceInfo {
  // Hardware
  memory: number; // GB
  cores: number;
  gpu: string;

  // Benchmark scores
  benchmark: number; // Custom performance score 0-100
  domSpeed: number;
  renderSpeed: number;
  networkLatency: number;

  // Battery
  battery: {
    level: number; // 0-1
    charging: boolean;
    chargingTime: number; // seconds
    dischargingTime: number; // seconds
  } | null;
}

export interface PreferencesInfo {
  reducedMotion: boolean;
  reducedTransparency: boolean;
  colorScheme: 'light' | 'dark' | 'no-preference';
  contrast: 'no-preference' | 'more' | 'less';
  forcedColors: 'none' | 'active';
  invertedColors: boolean;
  highContrast: boolean;
}

export interface DeviceInfo {
  // Basic identification
  type: DeviceType;
  os: OSType;
  osVersion: string;
  browser: BrowserType;
  browserVersion: string;

  // Hardware
  screen: ScreenInfo;
  input: InputCapabilities;
  capabilities: HardwareCapabilities;
  performance: PerformanceInfo;

  // Network
  connection: ConnectionInfo;

  // User preferences
  preferences: PreferencesInfo;

  // Metadata
  userAgent: string;
  vendor: string;
  platform: string;
  language: string;
  languages: string[];
  timezone: string;

  // Computed properties
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  isHighDensity: boolean;
  isSlowConnection: boolean;
  supportsHDR: boolean;
  supports3D: boolean;
  supportsHaptic: boolean;
}

export interface OptimalSettings {
  animations: {
    enabled: boolean;
    reducedMotion: boolean;
    quality: 'low' | 'medium' | 'high' | 'ultra';
    fps: 30 | 60 | 90 | 120;
  };
  images: {
    format: 'avif' | 'webp' | 'jpeg' | 'png';
    quality: number;
    lazyLoading: boolean;
    preloadDistance: number;
    maxWidth: number;
  };
  video: {
    codec: 'av1' | 'vp9' | 'h265' | 'h264';
    quality: '360p' | '480p' | '720p' | '1080p' | '1440p' | '4k' | '8k';
    autoplay: boolean;
    preload: 'none' | 'metadata' | 'auto';
  };
  fonts: {
    strategy: 'swap' | 'block' | 'fallback' | 'optional';
    preload: boolean;
    subsetting: boolean;
  };
  layout: {
    columns: number;
    spacing: 'compact' | 'normal' | 'comfortable';
    density: 'high' | 'medium' | 'low';
  };
}

export type DeviceChangeListener = (info: DeviceInfo) => void;
