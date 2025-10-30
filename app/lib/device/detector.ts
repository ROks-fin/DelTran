/**
 * Ultra-Premium Device Detector
 * Comprehensive device and capability detection system
 */

'use client';

import type {
  DeviceInfo,
  DeviceType,
  OSType,
  BrowserType,
  ConnectionType,
  ColorGamut,
  RefreshRate,
  Orientation,
  OptimalSettings,
  DeviceChangeListener,
  ScreenInfo,
  InputCapabilities,
  ConnectionInfo,
  HardwareCapabilities,
  PerformanceInfo,
  PreferencesInfo
} from './types';

export class DeviceDetector {
  private static instance: DeviceDetector;
  private deviceInfo: DeviceInfo | null = null;
  private listeners: Set<DeviceChangeListener> = new Set();
  private isInitialized = false;

  static getInstance(): DeviceDetector {
    if (!this.instance) {
      this.instance = new DeviceDetector();
    }
    return this.instance;
  }

  private constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init(): void {
    if (this.isInitialized) return;

    this.deviceInfo = this.detectDevice();
    this.setupListeners();
    this.runPerformanceBenchmark();
    this.isInitialized = true;
  }

  /**
   * Main device detection logic
   */
  private detectDevice(): DeviceInfo {
    const ua = navigator.userAgent;

    return {
      // Basic identification
      type: this.detectDeviceType(),
      os: this.detectOS(),
      osVersion: this.detectOSVersion(),
      browser: this.detectBrowser(),
      browserVersion: this.detectBrowserVersion(),

      // Hardware
      screen: this.detectScreen(),
      input: this.detectInput(),
      capabilities: this.detectCapabilities(),
      performance: this.detectPerformance(),

      // Network
      connection: this.detectConnection(),

      // User preferences
      preferences: this.detectPreferences(),

      // Metadata
      userAgent: ua,
      vendor: navigator.vendor || '',
      platform: navigator.platform || '',
      language: navigator.language || 'en',
      languages: Array.from(navigator.languages || ['en']),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',

      // Computed properties
      isMobile: this.isMobileDevice(),
      isTablet: this.isTabletDevice(),
      isDesktop: this.isDesktopDevice(),
      isTouch: this.isTouchDevice(),
      isHighDensity: window.devicePixelRatio > 1,
      isSlowConnection: this.isSlowConnectionDetected(),
      supportsHDR: this.detectHDRSupport(),
      supports3D: this.detect3DSupport(),
      supportsHaptic: this.detectHapticSupport()
    };
  }

  /**
   * Device type detection
   */
  private detectDeviceType(): DeviceType {
    const ua = navigator.userAgent.toLowerCase();
    const width = window.innerWidth;

    // VR/AR detection
    if ('xr' in navigator || ua.includes('oculus') || ua.includes('quest')) {
      return 'vr';
    }

    // Watch detection
    if (width < 250 || ua.includes('watch')) {
      return 'watch';
    }

    // TV detection
    if (
      ua.includes('tv') ||
      ua.includes('smarttv') ||
      ua.includes('googletv') ||
      ua.includes('appletv')
    ) {
      return 'tv';
    }

    // Car detection
    if (ua.includes('carplay') || ua.includes('androidauto')) {
      return 'car';
    }

    // Mobile detection
    if (
      /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua) &&
      width < 768
    ) {
      return 'mobile';
    }

    // Tablet detection
    if (
      (/ipad|android/i.test(ua) && width >= 768 && width < 1024) ||
      (ua.includes('tablet') || (ua.includes('android') && !ua.includes('mobile')))
    ) {
      return 'tablet';
    }

    // Laptop/Desktop distinction based on touch capability and screen size
    if (width >= 1024 && width < 1920) {
      return 'laptop';
    }

    return 'desktop';
  }

  /**
   * Operating system detection
   */
  private detectOS(): OSType {
    const ua = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || '';

    if (/iphone|ipad|ipod/.test(ua)) return 'ios';
    if (/android/.test(ua)) return 'android';
    if (/mac/.test(platform) && !('ontouchend' in document)) return 'macos';
    if (/win/.test(platform)) return 'windows';
    if (/linux/.test(platform) || /x11/.test(platform)) {
      if (/cros/.test(ua)) return 'chromeos';
      return 'linux';
    }
    if (/watch/.test(ua)) return 'wearos';
    if (/tv/.test(ua)) return 'tvos';

    return 'unknown';
  }

  /**
   * OS version detection
   */
  private detectOSVersion(): string {
    const ua = navigator.userAgent;

    // iOS version
    const iosMatch = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (iosMatch) {
      return `${iosMatch[1]}.${iosMatch[2]}${iosMatch[3] ? '.' + iosMatch[3] : ''}`;
    }

    // Android version
    const androidMatch = ua.match(/Android (\d+\.?\d*)/);
    if (androidMatch) {
      return androidMatch[1];
    }

    // Windows version
    const windowsMatch = ua.match(/Windows NT (\d+\.\d+)/);
    if (windowsMatch) {
      return windowsMatch[1];
    }

    return 'unknown';
  }

  /**
   * Browser detection
   */
  private detectBrowser(): BrowserType {
    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes('brave')) return 'brave';
    if (ua.includes('edg/')) return 'edge';
    if (ua.includes('opr/') || ua.includes('opera')) return 'opera';
    if (ua.includes('samsungbrowser')) return 'samsung';
    if (ua.includes('chrome')) return 'chrome';
    if (ua.includes('firefox')) return 'firefox';
    if (ua.includes('safari') && !ua.includes('chrome')) return 'safari';

    return 'unknown';
  }

  /**
   * Browser version detection
   */
  private detectBrowserVersion(): string {
    const ua = navigator.userAgent;
    const browser = this.detectBrowser();

    const patterns: Record<BrowserType, RegExp> = {
      chrome: /Chrome\/(\d+\.\d+)/,
      firefox: /Firefox\/(\d+\.\d+)/,
      safari: /Version\/(\d+\.\d+)/,
      edge: /Edg\/(\d+\.\d+)/,
      opera: /OPR\/(\d+\.\d+)/,
      brave: /Brave\/(\d+\.\d+)/,
      samsung: /SamsungBrowser\/(\d+\.\d+)/,
      unknown: /./
    };

    const match = ua.match(patterns[browser]);
    return match ? match[1] : 'unknown';
  }

  /**
   * Screen information detection
   */
  private detectScreen(): ScreenInfo {
    const orientation = this.detectOrientation();
    const pixelRatio = window.devicePixelRatio || 1;

    return {
      width: window.innerWidth,
      height: window.innerHeight,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      pixelRatio,
      orientation,
      colorGamut: this.detectColorGamut(),
      colorDepth: screen.colorDepth,
      hdr: this.detectHDRSupport(),
      refreshRate: this.detectRefreshRate(),
      isRetina: pixelRatio >= 2
    };
  }

  /**
   * Orientation detection
   */
  private detectOrientation(): Orientation {
    if (window.innerWidth > window.innerHeight) {
      return 'landscape';
    }
    return 'portrait';
  }

  /**
   * Color gamut detection
   */
  private detectColorGamut(): ColorGamut {
    if (window.matchMedia('(color-gamut: rec2020)').matches) {
      return 'rec2020';
    }
    if (window.matchMedia('(color-gamut: p3)').matches) {
      return 'p3';
    }
    return 'srgb';
  }

  /**
   * Refresh rate detection
   */
  private detectRefreshRate(): RefreshRate {
    // Default to 60Hz, can be enhanced with requestAnimationFrame detection
    return 60;
  }

  /**
   * Input capabilities detection
   */
  private detectInput(): InputCapabilities {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    const hasPen = window.matchMedia('(pointer: fine)').matches && 'PointerEvent' in window;

    return {
      touch: hasTouch,
      mouse: hasMouse || !hasTouch,
      pen: hasPen,
      keyboard: true, // Assume keyboard availability
      voice: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
      gamepad: 'getGamepads' in navigator,
      touchPoints: navigator.maxTouchPoints || 0,
      coarsePointer: window.matchMedia('(pointer: coarse)').matches,
      finePointer: window.matchMedia('(pointer: fine)').matches
    };
  }

  /**
   * Connection information detection
   */
  private detectConnection(): ConnectionInfo {
    const conn = (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (!conn) {
      return {
        type: 'unknown',
        effectiveType: 'unknown',
        downlink: 10,
        downlinkMax: 10,
        rtt: 50,
        saveData: false,
        online: navigator.onLine
      };
    }

    return {
      type: conn.type || 'unknown',
      effectiveType: conn.effectiveType || '4g',
      downlink: conn.downlink || 10,
      downlinkMax: conn.downlinkMax || 10,
      rtt: conn.rtt || 50,
      saveData: conn.saveData || false,
      online: navigator.onLine
    };
  }

  /**
   * Hardware capabilities detection
   */
  private detectCapabilities(): HardwareCapabilities {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const gl2 = canvas.getContext('webgl2');

    return {
      // Graphics
      webgl: !!gl,
      webgl2: !!gl2,
      webgpu: 'gpu' in navigator,

      // Canvas
      canvas: !!canvas.getContext('2d'),
      offscreenCanvas: 'OffscreenCanvas' in window,

      // Storage
      localStorage: 'localStorage' in window,
      sessionStorage: 'sessionStorage' in window,
      indexedDB: 'indexedDB' in window,

      // Workers
      serviceWorker: 'serviceWorker' in navigator,
      sharedWorker: 'SharedWorker' in window,
      webWorker: 'Worker' in window,

      // Multimedia
      webRTC: 'RTCPeerConnection' in window,
      mediaRecorder: 'MediaRecorder' in window,
      pictureInPicture: 'pictureInPictureEnabled' in document,

      // Advanced
      sharedArrayBuffer: 'SharedArrayBuffer' in window,
      webAssembly: 'WebAssembly' in window,

      // Network
      pushNotifications: 'PushManager' in window,
      webSocket: 'WebSocket' in window,

      // Device APIs
      bluetooth: 'bluetooth' in navigator,
      nfc: 'nfc' in navigator,
      usb: 'usb' in navigator,
      midi: 'requestMIDIAccess' in navigator,

      // Sensors
      gyroscope: 'Gyroscope' in window,
      accelerometer: 'Accelerometer' in window,
      magnetometer: 'Magnetometer' in window,
      ambientLight: 'AmbientLightSensor' in window,
      proximity: 'ProximitySensor' in window,

      // Output
      vibration: 'vibrate' in navigator,
      speechSynthesis: 'speechSynthesis' in window,

      // Input
      speechRecognition: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,

      // Location
      geolocation: 'geolocation' in navigator,

      // Media
      camera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
      microphone: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,

      // XR
      webxr: 'xr' in navigator,
      webxrAR: false, // Will be detected async
      webxrVR: false  // Will be detected async
    };
  }

  /**
   * Performance information detection
   */
  private detectPerformance(): PerformanceInfo {
    const memory = (performance as any).memory;

    return {
      memory: memory ? Math.round(memory.jsHeapSizeLimit / 1024 / 1024 / 1024 * 10) / 10 : 4,
      cores: navigator.hardwareConcurrency || 4,
      gpu: this.detectGPU(),
      benchmark: 50, // Will be calculated in runPerformanceBenchmark
      domSpeed: 50,
      renderSpeed: 50,
      networkLatency: 50,
      battery: null // Will be detected async
    };
  }

  /**
   * GPU detection
   */
  private detectGPU(): string {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) return 'unknown';

    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      return (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }

    return 'unknown';
  }

  /**
   * User preferences detection
   */
  private detectPreferences(): PreferencesInfo {
    return {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      reducedTransparency: window.matchMedia('(prefers-reduced-transparency: reduce)').matches,
      colorScheme: this.detectColorScheme(),
      contrast: this.detectContrast(),
      forcedColors: window.matchMedia('(forced-colors: active)').matches ? 'active' : 'none',
      invertedColors: window.matchMedia('(inverted-colors: inverted)').matches,
      highContrast: window.matchMedia('(prefers-contrast: more)').matches
    };
  }

  /**
   * Color scheme detection
   */
  private detectColorScheme(): 'light' | 'dark' | 'no-preference' {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'no-preference';
  }

  /**
   * Contrast preference detection
   */
  private detectContrast(): 'no-preference' | 'more' | 'less' {
    if (window.matchMedia('(prefers-contrast: more)').matches) {
      return 'more';
    }
    if (window.matchMedia('(prefers-contrast: less)').matches) {
      return 'less';
    }
    return 'no-preference';
  }

  /**
   * Helper detection methods
   */
  private isMobileDevice(): boolean {
    return this.detectDeviceType() === 'mobile';
  }

  private isTabletDevice(): boolean {
    return this.detectDeviceType() === 'tablet';
  }

  private isDesktopDevice(): boolean {
    const type = this.detectDeviceType();
    return type === 'desktop' || type === 'laptop';
  }

  private isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  private isSlowConnectionDetected(): boolean {
    const conn = this.detectConnection();
    return (
      conn.effectiveType === 'slow-2g' ||
      conn.effectiveType === '2g' ||
      conn.saveData ||
      conn.downlink < 1
    );
  }

  private detectHDRSupport(): boolean {
    return window.matchMedia('(dynamic-range: high)').matches;
  }

  private detect3DSupport(): boolean {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
    return !!gl;
  }

  private detectHapticSupport(): boolean {
    return 'vibrate' in navigator;
  }

  /**
   * Setup event listeners for device changes
   */
  private setupListeners(): void {
    // Orientation change
    window.addEventListener('orientationchange', this.handleOrientationChange);
    window.addEventListener('resize', this.handleResize);

    // Network change
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', this.handleNetworkChange);
    }

    // Color scheme change
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.handleColorSchemeChange);

    // Reduced motion change
    window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', this.handleMotionChange);

    // HDR change
    window
      .matchMedia('(dynamic-range: high)')
      .addEventListener('change', this.handleHDRChange);

    // Online/offline
    window.addEventListener('online', this.handleOnlineChange);
    window.addEventListener('offline', this.handleOnlineChange);
  }

  /**
   * Event handlers
   */
  private handleOrientationChange = (): void => {
    this.updateDeviceInfo();
  };

  private handleResize = (): void => {
    this.updateDeviceInfo();
  };

  private handleNetworkChange = (): void => {
    this.updateDeviceInfo();
  };

  private handleColorSchemeChange = (): void => {
    this.updateDeviceInfo();
  };

  private handleMotionChange = (): void => {
    this.updateDeviceInfo();
  };

  private handleHDRChange = (): void => {
    this.updateDeviceInfo();
  };

  private handleOnlineChange = (): void => {
    this.updateDeviceInfo();
  };

  /**
   * Update device info and notify listeners
   */
  private updateDeviceInfo(): void {
    this.deviceInfo = this.detectDevice();
    this.notifyListeners();
  }

  /**
   * Notify all listeners of device changes
   */
  private notifyListeners(): void {
    if (!this.deviceInfo) return;

    this.listeners.forEach((listener) => {
      listener(this.deviceInfo!);
    });
  }

  /**
   * Run performance benchmark
   */
  private async runPerformanceBenchmark(): Promise<void> {
    if (!this.deviceInfo) return;

    // DOM manipulation speed test
    const domStart = performance.now();
    const div = document.createElement('div');
    for (let i = 0; i < 100; i++) {
      div.appendChild(document.createElement('span'));
    }
    const domTime = performance.now() - domStart;

    // Canvas rendering speed test
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const renderStart = performance.now();
    if (ctx) {
      for (let i = 0; i < 1000; i++) {
        ctx.fillRect(Math.random() * 100, Math.random() * 100, 10, 10);
      }
    }
    const renderTime = performance.now() - renderStart;

    // Calculate benchmark score (0-100)
    const domScore = Math.max(0, 100 - domTime * 10);
    const renderScore = Math.max(0, 100 - renderTime);
    const benchmark = Math.round((domScore + renderScore) / 2);

    this.deviceInfo.performance.benchmark = benchmark;
    this.deviceInfo.performance.domSpeed = domScore;
    this.deviceInfo.performance.renderSpeed = renderScore;

    // Battery API
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        this.deviceInfo.performance.battery = {
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime
        };
      } catch (e) {
        // Battery API not available
      }
    }

    // XR capabilities
    if ('xr' in navigator) {
      try {
        const vrSupported = await (navigator as any).xr.isSessionSupported('immersive-vr');
        const arSupported = await (navigator as any).xr.isSessionSupported('immersive-ar');
        this.deviceInfo.capabilities.webxrVR = vrSupported;
        this.deviceInfo.capabilities.webxrAR = arSupported;
      } catch (e) {
        // XR not supported
      }
    }
  }

  /**
   * Get optimal settings based on device capabilities
   */
  public getOptimalSettings(): OptimalSettings {
    if (!this.deviceInfo) {
      throw new Error('Device not initialized');
    }

    const { performance, connection, preferences, screen, capabilities } = this.deviceInfo;

    return {
      animations: {
        enabled: !preferences.reducedMotion,
        reducedMotion: preferences.reducedMotion,
        quality: this.getAnimationQuality(performance.benchmark, connection.effectiveType),
        fps: this.getOptimalFPS(screen.refreshRate, performance.benchmark)
      },
      images: {
        format: this.getOptimalImageFormat(capabilities),
        quality: this.getOptimalImageQuality(connection.effectiveType),
        lazyLoading: true,
        preloadDistance: connection.saveData ? 50 : 500,
        maxWidth: screen.width * screen.pixelRatio
      },
      video: {
        codec: this.getOptimalVideoCodec(capabilities),
        quality: this.getOptimalVideoQuality(screen.width, connection.effectiveType),
        autoplay: !connection.saveData && connection.effectiveType === '4g',
        preload: connection.saveData ? 'none' : 'metadata'
      },
      fonts: {
        strategy: connection.saveData ? 'optional' : 'swap',
        preload: !connection.saveData,
        subsetting: connection.saveData
      },
      layout: {
        columns: this.getOptimalColumns(screen.width),
        spacing: this.getOptimalSpacing(screen.width),
        density: this.getOptimalDensity(screen.width, screen.pixelRatio)
      }
    };
  }

  private getAnimationQuality(benchmark: number, connection: ConnectionType): 'low' | 'medium' | 'high' | 'ultra' {
    if (benchmark > 80 && (connection === '4g' || connection === '5g' || connection === 'wifi')) {
      return 'ultra';
    }
    if (benchmark > 60) return 'high';
    if (benchmark > 40) return 'medium';
    return 'low';
  }

  private getOptimalFPS(refreshRate: RefreshRate, benchmark: number): 30 | 60 | 90 | 120 {
    if (benchmark < 40) return 30;
    if (benchmark < 60 || refreshRate === 60) return 60;
    if (benchmark < 80 || refreshRate === 90) return 90;
    return 120;
  }

  private getOptimalImageFormat(capabilities: HardwareCapabilities): 'avif' | 'webp' | 'jpeg' | 'png' {
    // Check via CSS.supports or create test image
    const supportsAvif = this.supportsImageFormat('avif');
    const supportsWebp = this.supportsImageFormat('webp');

    if (supportsAvif) return 'avif';
    if (supportsWebp) return 'webp';
    return 'jpeg';
  }

  private supportsImageFormat(format: string): boolean {
    // This would need async detection in real implementation
    // For now, use browser detection
    const browser = this.detectBrowser();
    if (format === 'avif') {
      return ['chrome', 'edge', 'opera', 'brave'].includes(browser);
    }
    if (format === 'webp') {
      return browser !== 'unknown';
    }
    return true;
  }

  private getOptimalImageQuality(connection: ConnectionType): number {
    if (connection === 'slow-2g' || connection === '2g') return 60;
    if (connection === '3g') return 75;
    return 85;
  }

  private getOptimalVideoCodec(capabilities: HardwareCapabilities): 'av1' | 'vp9' | 'h265' | 'h264' {
    // Simplified codec detection
    return 'h264'; // Most compatible
  }

  private getOptimalVideoQuality(width: number, connection: ConnectionType): '360p' | '480p' | '720p' | '1080p' | '1440p' | '4k' | '8k' {
    if (connection === 'slow-2g' || connection === '2g') return '360p';
    if (connection === '3g') return '480p';
    if (width < 768) return '720p';
    if (width < 1920) return '1080p';
    if (width < 2560) return '1440p';
    if (width < 3840) return '4k';
    return '8k';
  }

  private getOptimalColumns(width: number): number {
    if (width < 480) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    if (width < 1440) return 4;
    if (width < 1920) return 5;
    return 6;
  }

  private getOptimalSpacing(width: number): 'compact' | 'normal' | 'comfortable' {
    if (width < 768) return 'compact';
    if (width < 1920) return 'normal';
    return 'comfortable';
  }

  private getOptimalDensity(width: number, pixelRatio: number): 'high' | 'medium' | 'low' {
    if (width < 768 || pixelRatio >= 2) return 'high';
    if (width < 1920) return 'medium';
    return 'low';
  }

  /**
   * Public API
   */
  public getDeviceInfo(): DeviceInfo {
    if (!this.deviceInfo) {
      throw new Error('Device not initialized');
    }
    return this.deviceInfo;
  }

  public subscribe(listener: DeviceChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public destroy(): void {
    // Remove all event listeners
    window.removeEventListener('orientationchange', this.handleOrientationChange);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('online', this.handleOnlineChange);
    window.removeEventListener('offline', this.handleOnlineChange);

    const connection = (navigator as any).connection;
    if (connection) {
      connection.removeEventListener('change', this.handleNetworkChange);
    }

    this.listeners.clear();
  }
}

// Export singleton instance
export const deviceDetector = DeviceDetector.getInstance();

// Export convenience function
export function getDeviceInfo(): DeviceInfo {
  return deviceDetector.getDeviceInfo();
}

export function getOptimalSettings(): OptimalSettings {
  return deviceDetector.getOptimalSettings();
}
