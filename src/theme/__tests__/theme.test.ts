import {lightTheme, darkTheme, getTheme} from '../theme';

describe('Theme System', () => {
  describe('Light Theme', () => {
    it('should have all required color tokens', () => {
      expect(lightTheme.colors.primary).toBeDefined();
      expect(lightTheme.colors.primaryDark).toBeDefined();
      expect(lightTheme.colors.primaryLight).toBeDefined();
      expect(lightTheme.colors.success).toBeDefined();
      expect(lightTheme.colors.successDark).toBeDefined();
      expect(lightTheme.colors.successLight).toBeDefined();
      expect(lightTheme.colors.warning).toBeDefined();
      expect(lightTheme.colors.warningDark).toBeDefined();
      expect(lightTheme.colors.warningLight).toBeDefined();
      expect(lightTheme.colors.danger).toBeDefined();
      expect(lightTheme.colors.dangerDark).toBeDefined();
      expect(lightTheme.colors.dangerLight).toBeDefined();
      expect(lightTheme.colors.background).toBeDefined();
      expect(lightTheme.colors.surface).toBeDefined();
      expect(lightTheme.colors.text).toBeDefined();
      expect(lightTheme.colors.textSecondary).toBeDefined();
      expect(lightTheme.colors.border).toBeDefined();
    });

    it('should have all required spacing tokens', () => {
      expect(lightTheme.spacing.xs).toBe(4);
      expect(lightTheme.spacing.sm).toBe(8);
      expect(lightTheme.spacing.md).toBe(16);
      expect(lightTheme.spacing.lg).toBe(24);
      expect(lightTheme.spacing.xl).toBe(32);
      expect(lightTheme.spacing['2xl']).toBe(48);
      expect(lightTheme.spacing['3xl']).toBe(64);
    });

    it('should have all required typography tokens', () => {
      expect(lightTheme.typography.fontFamily.base).toBeDefined();
      expect(lightTheme.typography.fontFamily.mono).toBeDefined();
      expect(lightTheme.typography.fontSize.xs).toBe(12);
      expect(lightTheme.typography.fontSize.sm).toBe(14);
      expect(lightTheme.typography.fontSize.base).toBe(16);
      expect(lightTheme.typography.fontSize.lg).toBe(18);
      expect(lightTheme.typography.fontSize.xl).toBe(20);
      expect(lightTheme.typography.fontSize['2xl']).toBe(24);
      expect(lightTheme.typography.fontSize['3xl']).toBe(30);
      expect(lightTheme.typography.fontSize['4xl']).toBe(36);
      expect(lightTheme.typography.fontSize['5xl']).toBe(48);
      expect(lightTheme.typography.fontWeight.light).toBe('300');
      expect(lightTheme.typography.fontWeight.normal).toBe('400');
      expect(lightTheme.typography.fontWeight.medium).toBe('500');
      expect(lightTheme.typography.fontWeight.semibold).toBe('600');
      expect(lightTheme.typography.fontWeight.bold).toBe('700');
      expect(lightTheme.typography.lineHeight.tight).toBe(1.25);
      expect(lightTheme.typography.lineHeight.normal).toBe(1.5);
      expect(lightTheme.typography.lineHeight.relaxed).toBe(1.75);
    });

    it('should have all required radius tokens', () => {
      expect(lightTheme.radius.sm).toBe(4);
      expect(lightTheme.radius.md).toBe(8);
      expect(lightTheme.radius.lg).toBe(12);
      expect(lightTheme.radius.xl).toBe(16);
      expect(lightTheme.radius.full).toBe(9999);
    });

    it('should have all required shadow tokens', () => {
      expect(lightTheme.shadows.sm).toBeDefined();
      expect(lightTheme.shadows.md).toBeDefined();
      expect(lightTheme.shadows.lg).toBeDefined();
      expect(lightTheme.shadows.xl).toBeDefined();
    });

    it('should have all required transition tokens', () => {
      expect(lightTheme.transitions.fast).toBe(150);
      expect(lightTheme.transitions.base).toBe(250);
      expect(lightTheme.transitions.slow).toBe(350);
    });
  });

  describe('Dark Theme', () => {
    it('should have different color values from light theme', () => {
      expect(darkTheme.colors.background).not.toBe(lightTheme.colors.background);
      expect(darkTheme.colors.surface).not.toBe(lightTheme.colors.surface);
      expect(darkTheme.colors.text).not.toBe(lightTheme.colors.text);
      expect(darkTheme.colors.textSecondary).not.toBe(
        lightTheme.colors.textSecondary,
      );
    });

    it('should have same spacing values as light theme', () => {
      expect(darkTheme.spacing).toEqual(lightTheme.spacing);
    });

    it('should have same typography values as light theme', () => {
      expect(darkTheme.typography).toEqual(lightTheme.typography);
    });

    it('should have same radius values as light theme', () => {
      expect(darkTheme.radius).toEqual(lightTheme.radius);
    });

    it('should have same transition values as light theme', () => {
      expect(darkTheme.transitions).toEqual(lightTheme.transitions);
    });
  });

  describe('getTheme function', () => {
    it('should return light theme when mode is "light"', () => {
      const theme = getTheme('light');
      expect(theme).toEqual(lightTheme);
    });

    it('should return dark theme when mode is "dark"', () => {
      const theme = getTheme('dark');
      expect(theme).toEqual(darkTheme);
    });

    it('should switch between light and dark themes', () => {
      const light = getTheme('light');
      const dark = getTheme('dark');
      expect(light.colors.background).not.toBe(dark.colors.background);
    });
  });

  describe('Activity Colors', () => {
    it('should have activity-specific color tokens in light theme', () => {
      expect(lightTheme.colors.walking).toBeDefined();
      expect(lightTheme.colors.running).toBeDefined();
      expect(lightTheme.colors.inactive).toBeDefined();
    });

    it('should have activity-specific color tokens in dark theme', () => {
      expect(darkTheme.colors.walking).toBeDefined();
      expect(darkTheme.colors.running).toBeDefined();
      expect(darkTheme.colors.inactive).toBeDefined();
    });
  });

  describe('Neutral Color Scale', () => {
    it('should have complete neutral color scale in light theme', () => {
      expect(lightTheme.colors.neutral50).toBeDefined();
      expect(lightTheme.colors.neutral100).toBeDefined();
      expect(lightTheme.colors.neutral200).toBeDefined();
      expect(lightTheme.colors.neutral300).toBeDefined();
      expect(lightTheme.colors.neutral400).toBeDefined();
      expect(lightTheme.colors.neutral500).toBeDefined();
      expect(lightTheme.colors.neutral600).toBeDefined();
      expect(lightTheme.colors.neutral700).toBeDefined();
      expect(lightTheme.colors.neutral800).toBeDefined();
      expect(lightTheme.colors.neutral900).toBeDefined();
    });

    it('should have complete neutral color scale in dark theme', () => {
      expect(darkTheme.colors.neutral50).toBeDefined();
      expect(darkTheme.colors.neutral100).toBeDefined();
      expect(darkTheme.colors.neutral200).toBeDefined();
      expect(darkTheme.colors.neutral300).toBeDefined();
      expect(darkTheme.colors.neutral400).toBeDefined();
      expect(darkTheme.colors.neutral500).toBeDefined();
      expect(darkTheme.colors.neutral600).toBeDefined();
      expect(darkTheme.colors.neutral700).toBeDefined();
      expect(darkTheme.colors.neutral800).toBeDefined();
      expect(darkTheme.colors.neutral900).toBeDefined();
    });
  });
});
