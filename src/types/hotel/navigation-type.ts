export interface NavigationType {
  activeTab: string;
  scrollToSection: (id: string) => void;
  setActiveTab?: (id: string) => void;
}
