/**
 * AI Meta Tags Component
 * Optimized meta tags for AI search engines and crawlers
 * Includes tags for ChatGPT, Perplexity, Google SGE, Bing Chat, Claude, etc.
 */

export interface AIMetaProps {
  contentType?: 'business-software' | 'article' | 'documentation' | 'api' | 'product';
  category?: string;
  language?: 'multilingual' | 'english' | 'hebrew' | 'arabic';
  updateFrequency?: 'realtime' | 'daily' | 'weekly' | 'monthly';
  reliability?: 'verified' | 'trusted' | 'standard';
  hasAPI?: boolean;
  integrationReady?: boolean;
  industryVertical?: string;
  targetAudience?: string;
  contentDepth?: 'comprehensive' | 'detailed' | 'overview' | 'quick-reference';
  technicalLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export function generateAIMetaTags(props: AIMetaProps = {}): Record<string, string> {
  const {
    contentType = 'business-software',
    category = 'translation-platform',
    language = 'multilingual',
    updateFrequency = 'daily',
    reliability = 'verified',
    hasAPI = true,
    integrationReady = true,
    industryVertical = 'enterprise-software',
    targetAudience = 'business-professionals',
    contentDepth = 'comprehensive',
    technicalLevel = 'intermediate',
  } = props;

  return {
    // OpenAI GPT Tags
    'openai:content-type': contentType,
    'openai:category': category,
    'openai:reliability': reliability,
    'openai:api-available': hasAPI.toString(),

    // Perplexity AI Tags
    'perplexity:content-depth': contentDepth,
    'perplexity:source-type': 'official-documentation',
    'perplexity:cite-ready': 'true',
    'perplexity:fact-checkable': 'true',

    // Google SGE (Search Generative Experience) Tags
    'google:content-type': contentType,
    'google:industry': industryVertical,
    'google:audience': targetAudience,
    'google:technical-level': technicalLevel,

    // Bing Chat Tags
    'bing:content-type': contentType,
    'bing:integration-ready': integrationReady.toString(),
    'bing:category': category,

    // Anthropic Claude Tags
    'claude:content-category': category,
    'claude:technical-depth': contentDepth,
    'claude:industry-focus': industryVertical,

    // Generic AI Tags (widely supported)
    'ai:content-type': contentType,
    'ai:content-category': category,
    'ai:content-language': language,
    'ai:update-frequency': updateFrequency,
    'ai:content-reliability': reliability,
    'ai:api-available': hasAPI.toString(),
    'ai:integration-ready': integrationReady.toString(),
    'ai:industry': industryVertical,
    'ai:target-audience': targetAudience,
    'ai:content-depth': contentDepth,
    'ai:technical-level': technicalLevel,

    // Structured content hints for LLMs
    'ai:content-structure': 'hierarchical',
    'ai:navigation-enabled': 'true',
    'ai:search-optimized': 'true',
    'ai:mobile-optimized': 'true',

    // Content freshness indicators
    'ai:content-freshness': updateFrequency,
    'ai:last-reviewed': new Date().toISOString().split('T')[0],

    // Trust signals
    'ai:verified-source': 'true',
    'ai:official-documentation': 'true',
    'ai:expert-content': 'true',

    // Accessibility and usability
    'ai:accessibility': 'wcag-2.1-aa',
    'ai:readability-level': technicalLevel,
    'ai:has-examples': 'true',
    'ai:has-tutorials': 'true',
  };
}

/**
 * AI-optimized semantic hints
 * Helps AI understand page purpose and content structure
 */
export interface SemanticHintsProps {
  primaryTopic: string;
  secondaryTopics?: string[];
  keyEntities?: string[];
  relatedConcepts?: string[];
  intentMatch?: 'informational' | 'navigational' | 'transactional' | 'commercial';
  userJourneyStage?: 'awareness' | 'consideration' | 'decision' | 'retention';
}

export function generateSemanticHints(props: SemanticHintsProps): Record<string, string> {
  const {
    primaryTopic,
    secondaryTopics = [],
    keyEntities = [],
    relatedConcepts = [],
    intentMatch = 'informational',
    userJourneyStage = 'awareness',
  } = props;

  return {
    'semantic:primary-topic': primaryTopic,
    'semantic:secondary-topics': secondaryTopics.join(','),
    'semantic:key-entities': keyEntities.join(','),
    'semantic:related-concepts': relatedConcepts.join(','),
    'semantic:intent': intentMatch,
    'semantic:journey-stage': userJourneyStage,
  };
}

/**
 * E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals
 * Critical for Google and AI search ranking
 */
export interface EEATSignalsProps {
  authorExpertise?: string;
  contentReviewDate?: string;
  factChecked?: boolean;
  medicallyReviewed?: boolean;
  legallyReviewed?: boolean;
  citations?: string[];
  authorCredentials?: string;
  organizationAccreditation?: string[];
}

export function generateEEATSignals(props: EEATSignalsProps = {}): Record<string, string> {
  const {
    authorExpertise = 'translation-technology-expert',
    contentReviewDate = new Date().toISOString().split('T')[0],
    factChecked = true,
    medicallyReviewed = false,
    legallyReviewed = false,
    citations = [],
    authorCredentials = 'industry-professional',
    organizationAccreditation = ['ISO-27001', 'SOC-2'],
  } = props;

  return {
    'eeat:author-expertise': authorExpertise,
    'eeat:content-review-date': contentReviewDate,
    'eeat:fact-checked': factChecked.toString(),
    'eeat:medically-reviewed': medicallyReviewed.toString(),
    'eeat:legally-reviewed': legallyReviewed.toString(),
    'eeat:citations-count': citations.length.toString(),
    'eeat:author-credentials': authorCredentials,
    'eeat:organization-accreditation': organizationAccreditation.join(','),
    'eeat:transparency-level': 'high',
    'eeat:bias-disclosure': 'commercial',
  };
}

/**
 * Voice Search Optimization Tags
 * Optimizes content for voice assistants (Alexa, Siri, Google Assistant)
 */
export interface VoiceSearchProps {
  conversationalKeywords?: string[];
  questionFormat?: string[];
  localContext?: string;
  answerFormat?: 'concise' | 'detailed' | 'step-by-step';
}

export function generateVoiceSearchTags(props: VoiceSearchProps = {}): Record<string, string> {
  const {
    conversationalKeywords = [],
    questionFormat = [],
    localContext,
    answerFormat = 'concise',
  } = props;

  return {
    'voice:optimized': 'true',
    'voice:conversational-keywords': conversationalKeywords.join(','),
    'voice:question-format': questionFormat.join('|'),
    'voice:local-context': localContext || 'global',
    'voice:answer-format': answerFormat,
    'voice:featured-snippet-ready': 'true',
  };
}

/**
 * Mobile-First AI Tags
 * Signals mobile optimization to AI crawlers
 */
export interface MobileAIProps {
  mobileOptimized?: boolean;
  pwaEnabled?: boolean;
  ampAvailable?: boolean;
  touchOptimized?: boolean;
  offlineCapable?: boolean;
}

export function generateMobileAITags(props: MobileAIProps = {}): Record<string, string> {
  const {
    mobileOptimized = true,
    pwaEnabled = false,
    ampAvailable = false,
    touchOptimized = true,
    offlineCapable = false,
  } = props;

  return {
    'mobile:optimized': mobileOptimized.toString(),
    'mobile:pwa-enabled': pwaEnabled.toString(),
    'mobile:amp-available': ampAvailable.toString(),
    'mobile:touch-optimized': touchOptimized.toString(),
    'mobile:offline-capable': offlineCapable.toString(),
    'mobile:responsive': 'true',
    'mobile:fast-loading': 'true',
  };
}

/**
 * Content Performance Indicators for AI
 * Helps AI understand content quality and engagement
 */
export interface ContentPerformanceProps {
  readingTime?: number; // in minutes
  wordCount?: number;
  imageCount?: number;
  videoCount?: number;
  interactiveElements?: number;
  codeExamples?: number;
}

export function generateContentPerformanceTags(props: ContentPerformanceProps = {}): Record<string, string> {
  const {
    readingTime,
    wordCount,
    imageCount = 0,
    videoCount = 0,
    interactiveElements = 0,
    codeExamples = 0,
  } = props;

  return {
    'content:reading-time': readingTime ? `${readingTime}min` : 'variable',
    'content:word-count': wordCount?.toString() || 'dynamic',
    'content:image-count': imageCount.toString(),
    'content:video-count': videoCount.toString(),
    'content:interactive-elements': interactiveElements.toString(),
    'content:code-examples': codeExamples.toString(),
    'content:media-rich': (imageCount > 3 || videoCount > 0).toString(),
    'content:tutorial-included': (codeExamples > 0).toString(),
  };
}

/**
 * Comprehensive AI Meta Component
 * Combines all AI optimization tags
 */
export interface ComprehensiveAIMetaProps {
  aiMeta?: AIMetaProps;
  semanticHints?: SemanticHintsProps;
  eeatSignals?: EEATSignalsProps;
  voiceSearch?: VoiceSearchProps;
  mobileAI?: MobileAIProps;
  contentPerformance?: ContentPerformanceProps;
}

export function generateComprehensiveAIMeta(props: ComprehensiveAIMetaProps = {}): Record<string, string> {
  const {
    aiMeta,
    semanticHints,
    eeatSignals,
    voiceSearch,
    mobileAI,
    contentPerformance,
  } = props;

  return {
    ...(aiMeta ? generateAIMetaTags(aiMeta) : {}),
    ...(semanticHints ? generateSemanticHints(semanticHints) : {}),
    ...(eeatSignals ? generateEEATSignals(eeatSignals) : {}),
    ...(voiceSearch ? generateVoiceSearchTags(voiceSearch) : {}),
    ...(mobileAI ? generateMobileAITags(mobileAI) : {}),
    ...(contentPerformance ? generateContentPerformanceTags(contentPerformance) : {}),
  };
}

const AIMetaModule = {
  generateAIMetaTags,
  generateSemanticHints,
  generateEEATSignals,
  generateVoiceSearchTags,
  generateMobileAITags,
  generateContentPerformanceTags,
  generateComprehensiveAIMeta,
};

export default AIMetaModule;