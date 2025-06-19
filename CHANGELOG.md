# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.0.0] - 2025-06-19

### New Features
- Added support for propagating ancestor field values to child input components, enabling dynamic field dependencies and value inheritance in forms.
- Introduced new utility functions for building dynamic URLs and API parameters based on ancestor values.
- Added new example datasets and advanced tree structures for demonstration and testing.

### Enhancements
- All input components now accept and respond to ancestor values, ensuring form fields can automatically update based on related field changes.
- Improved form submission to include detailed field value tracking.
- Upgraded multiple dependencies and bumped version to 2.0.0.

### Bug Fixes
- Improved value validation and initialization logic in input components to ensure consistency with ancestor context.

### Refactor
- Simplified and unified internal state management in form components.
- Replaced custom hooks with direct utility usage for API data fetching.

### Chores
- Removed redundant re-export files and unused icon components.
- Updated `.gitignore` to exclude environment files.

### Tests
- Added comprehensive unit tests for new utility functions and parameter builders.
- Added tests for tree node search utility and URL building logic.
