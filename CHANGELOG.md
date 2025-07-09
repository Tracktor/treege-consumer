# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.3.1](https://github.com/Tracktor/treege-consumer/compare/2.3.0...2.3.1) (2025-07-09)


### Bug Fixes

* date licence render ([65d7be7](https://github.com/Tracktor/treege-consumer/commit/65d7be7f1508b3618f1e6c6a8c16a8f37d5b3b45))
* dependencies ([236a24e](https://github.com/Tracktor/treege-consumer/commit/236a24e477135e1f2749306c5b5d8d2b702665d7))

## [2.3.0](https://github.com/Tracktor/treege-consumer/compare/2.2.0...2.3.0) (2025-07-03)


### Features

* enhance CheckBoxField to improve checked value logic with boolean handling ([163b7f0](https://github.com/Tracktor/treege-consumer/commit/163b7f008bde3202b9e049afdf8a1a7177d3fb7e))
* update CheckBoxField to simplify active state handling and improve checked value logic ([21c8780](https://github.com/Tracktor/treege-consumer/commit/21c8780de35b3590ac0e3263d00aa41539465bf1))

## [2.2.0](https://github.com/Tracktor/treege-consumer/compare/2.1.1...2.2.0) (2025-07-02)


### Features

* refine DynamicSelect component by improving value handling and query enabling logic ([c21f1b7](https://github.com/Tracktor/treege-consumer/commit/c21f1b70f508d450d1bee50c5662ba94e6ab03b8))

## [2.1.1](https://github.com/Tracktor/treege-consumer/compare/2.1.0...2.1.1) (2025-07-02)

## [2.1.0](https://github.com/Tracktor/treege-consumer/compare/2.0.0...2.1.0) (2025-06-25)


### Features

* add localText for LocalizationProvider ([38f81fc](https://github.com/Tracktor/treege-consumer/commit/38f81fcdb5bc2d3b05e5dad89632ced607f1cfed))

## [2.0.0](https://github.com/Tracktor/treege-consumer/compare/1.46.8...2.0.0) (2025-06-19)


### ⚠ BREAKING CHANGES

* passage à la version 2.0.0

* release major version ([2808a00](https://github.com/Tracktor/treege-consumer/commit/2808a00adefb9c6032b3a66de002c1b756189f50))


### Features

* add ancestor injection examples and enhance Sandbox for dynamic tree selection ([23b2c59](https://github.com/Tracktor/treege-consumer/commit/23b2c59cfa7c561a06161b036efc108a1c1b6e5c))
* add ancestor injection support in TreeNode structures and introduce UUID-based retrieval utility ([bdb6001](https://github.com/Tracktor/treege-consumer/commit/bdb6001df2d0c31b4ee18ee150d0d2653c1d876e))
* add ancestor value support to FieldFactory, SwitchField, and TextField components ([691ca31](https://github.com/Tracktor/treege-consumer/commit/691ca31f8730e1ea85332f30eb82902c338b0ac9))
* add formatValue function to handle rawValue formatting in TimePicker component ([bd97080](https://github.com/Tracktor/treege-consumer/commit/bd97080554b46202c6456bfe97f0173709b700d5))
* add tests for paramsBuilder and urlBuilder utilities to ensure correct parameter handling ([406a858](https://github.com/Tracktor/treege-consumer/commit/406a8580c78e60d4038f15c25f468d723f545c4e))
* add urlBuilder utility and integrate dynamic URL handling in ApiAutocomplete and DynamicSelect components ([e0d4dd5](https://github.com/Tracktor/treege-consumer/commit/e0d4dd500170de8b20e2807bbc6cd2e945ccd5de))
* display loading state in select value and remove redundant helper text in DynamicSelect ([23fa865](https://github.com/Tracktor/treege-consumer/commit/23fa8657926865116c44ff8d60d428b71951b268))
* encode dynamic values in URL builder to ensure proper formatting ([764d2eb](https://github.com/Tracktor/treege-consumer/commit/764d2ebc96e0d32508c2a3c5b2e67fb916f7cd78))
* enhance Address component and address adapter for improved ancestor value handling ([e893324](https://github.com/Tracktor/treege-consumer/commit/e8933242b49b3b177ec90c1e964f52af2594962a))
* enhance addressToGoogleAutocompleteAdapter to return structured geocoding address type ([64816f3](https://github.com/Tracktor/treege-consumer/commit/64816f37a6ba9de143d02691132f54ca00120196))
* enhance ancestor value handling and update autocomplete parameters ([b39dc79](https://github.com/Tracktor/treege-consumer/commit/b39dc79f2955cd4d0dd4a6e80f0824c678a4922f))
* enhance ancestor value handling and update related components ([b09668c](https://github.com/Tracktor/treege-consumer/commit/b09668cb53de39c958f8c0e34ae0e2570c031e50))
* enhance ancestor value handling with safe property access and improve type definitions ([f329bfa](https://github.com/Tracktor/treege-consumer/commit/f329bfa71e3f5d41f805d7b193cd9f148288ce28))
* enhance ancestor value propagation and improve form handling in input components ([a83e7a0](https://github.com/Tracktor/treege-consumer/commit/a83e7a0c7fed56c84f1d730b14f220e202449f46))
* enhance ancestor value update in DatePicker to trigger onChange only on actual changes ([d1c12a2](https://github.com/Tracktor/treege-consumer/commit/d1c12a2764068a1dddbb6f3352c55508320a3c91))
* enhance ApiAutocomplete and FieldFactory to support ancestor value injection ([2ef2c79](https://github.com/Tracktor/treege-consumer/commit/2ef2c79de8946e4035292cca5f418986335d2ccd))
* enhance App, DataViewer, Sandbox, TextField, and useTreegeConsumer components to improve detailFieldValues handling and synchronization logic ([a1bb8f1](https://github.com/Tracktor/treege-consumer/commit/a1bb8f141a2160a3925d4f4d80ecf1f98cad8151))
* enhance App, TextField, and TreegeConsumer components to improve detailFieldValues handling and synchronization logic ([8bda964](https://github.com/Tracktor/treege-consumer/commit/8bda964264437b4bf7a8703507786579f417dbc1))
* enhance CheckBoxField, FieldFactory, Radio, and SwitchField components to support ancestorValue handling and improve default selection logic ([e90f63f](https://github.com/Tracktor/treege-consumer/commit/e90f63f7be165ecd03102f3a369b948c11d84e03))
* enhance DatePicker and FieldFactory components to improve ancestorValue handling and synchronization logic ([b43724b](https://github.com/Tracktor/treege-consumer/commit/b43724bae42b32692c15791abb6fac4b40874900))
* enhance DatePicker and FieldFactory components to support ancestorValue handling and improve value consumption logic ([d926a11](https://github.com/Tracktor/treege-consumer/commit/d926a1169cbc6898a95036fcff331092c922c3bb))
* enhance DatePicker and SwitchField components to improve ancestorValue synchronization logic ([e0a74c9](https://github.com/Tracktor/treege-consumer/commit/e0a74c92618a79dbaa3c0fa75287eb811e5cc3c5))
* enhance DatePicker, FieldFactory, SwitchField, and TextField components to improve ancestorValue handling and state management ([df3267b](https://github.com/Tracktor/treege-consumer/commit/df3267be6aa3001569db10d915bacdca1ee73a40))
* enhance DateRange and FieldFactory components to improve ancestorValue handling and synchronization logic ([7719f4b](https://github.com/Tracktor/treege-consumer/commit/7719f4bd2a1052624dc9c4c05c5aaa4ffe9024a1))
* enhance DynamicSelect component to support URL change detection and improve value handling ([35d9097](https://github.com/Tracktor/treege-consumer/commit/35d9097c802c1938fcc347a7bc1cb5b6bbe8e67a))
* enhance FieldFactory and TextField components to support dynamic ancestorValue handling and update testWorksiteHours structure ([961b4d2](https://github.com/Tracktor/treege-consumer/commit/961b4d268bdc6c262dcf1d4b2c610cfdc3ecb819))
* enhance FieldFactory, Radio, and SwitchField components to support ancestorValue handling and improve default selection logic ([1710a9e](https://github.com/Tracktor/treege-consumer/commit/1710a9e13958f45cb29b67911dd14f85393f1167))
* enhance Radio component to support ancestorValue changes and improve default selection logic ([b9cbb70](https://github.com/Tracktor/treege-consumer/commit/b9cbb702b3a65bc8992d47435db5a5608a71671e))
* enhance Select and SwitchField components to improve ancestorValue handling and synchronization logic ([558d34d](https://github.com/Tracktor/treege-consumer/commit/558d34d64e717d25e3aa4fb7b04ae3fa4e483dee))
* enhance TextField component to improve ancestorValue handling and state synchronization ([b096e59](https://github.com/Tracktor/treege-consumer/commit/b096e59d964fa3bfe13aaa1af3908ec784858eba))
* enhance TimePicker and FieldFactory components to support time type and ancestorValue synchronization ([e55ed14](https://github.com/Tracktor/treege-consumer/commit/e55ed1415638689032791f13af033d20d2e12c1e))
* enhance TimeRange component to support timeRange structure and improve parsing logic ([37494a0](https://github.com/Tracktor/treege-consumer/commit/37494a0429ef5b94b0b24760b37574c40e8d6e2e))
* exemple improvement ([aaad4c7](https://github.com/Tracktor/treege-consumer/commit/aaad4c70d3038f9ac461d82b216201e615149021))
* handle undefined ancestorValue in TextField component ([a04d44b](https://github.com/Tracktor/treege-consumer/commit/a04d44b7edba01f12d82f4510460bd902b8bcd09))
* implement ancestor injection in TreeNode structure and add utility for node retrieval by UUID ([ce76005](https://github.com/Tracktor/treege-consumer/commit/ce760051fb01de2a8547224993d00d82de040e93))
* implement ancestor value handling in Autocomplete component and add address adapter ([e937d14](https://github.com/Tracktor/treege-consumer/commit/e937d14085b00741e778086c8776303249e13fa1))
* improve placeholder resolution and enhance input value handling in DynamicSelect component ([112382e](https://github.com/Tracktor/treege-consumer/commit/112382ef64242c42cdbe9f9b0531951f7c770020))
* refactor Address and FieldFactory components to replace ancestorValue handling with detailFieldValues integration ([1d5d64c](https://github.com/Tracktor/treege-consumer/commit/1d5d64c7969d0ac3d30cb4f4495dba6f9cd5398e))
* refactor App and Sandbox components to improve tree data handling and add example selection ([90e22b2](https://github.com/Tracktor/treege-consumer/commit/90e22b261f6d4d1cb080f6f8d2316d5c14cb6de2))
* refactor component structure and enhance type definitions ([1606eb0](https://github.com/Tracktor/treege-consumer/commit/1606eb0028a161d6b0d0f719fae2e746c901388f))
* refactor components to replace TreeFieldValues with DetailFieldValues for improved data handling ([9bd6e5d](https://github.com/Tracktor/treege-consumer/commit/9bd6e5d43f88c9ecc6fa82c41ca3f3255a98a1c7))
* refactor dynamic select component and update parameter handling ([eeb0928](https://github.com/Tracktor/treege-consumer/commit/eeb0928a8103b21f682995baef6a8c34b6168236))
* refactor Radio component to improve ancestorValue handling and default selection logic ([0e33b27](https://github.com/Tracktor/treege-consumer/commit/0e33b27ba22c8c88a02a428ef93d18995ea40a1b))
* refactor Radio component to improve ancestorValue handling and default selection logic ([7f7d3ef](https://github.com/Tracktor/treege-consumer/commit/7f7d3ef4588153847686fd28456c1100217069c2))
* refactor request fetching and enhance parameter handling in autocomplete components ([d80ead9](https://github.com/Tracktor/treege-consumer/commit/d80ead9bce5276339a9c744ddbe50365ae21aa0a))
* refine isActive logic in CheckBoxField to handle undefined ancestorValue ([ddc86f6](https://github.com/Tracktor/treege-consumer/commit/ddc86f6b0e19cdf5ebc668b97607847368916094))
* refine value handling in DynamicSelect and FieldFactory components for improved safety and clarity ([1edb4e4](https://github.com/Tracktor/treege-consumer/commit/1edb4e4a9c71763178266977d53d8b64336df637))
* remove unused tree prop from TreegeConsumer component ([afc77f0](https://github.com/Tracktor/treege-consumer/commit/afc77f09d0867dba4468e0f5f16662ef616dccd0))
* remove unused tree prop from TreegeConsumer component ([b792b31](https://github.com/Tracktor/treege-consumer/commit/b792b313b3e27dc02e024dace9fdd09ceb3bd982))
* remove unused tree prop from TreegeConsumer component ([3cf3226](https://github.com/Tracktor/treege-consumer/commit/3cf3226fae759176aa54c092afe8befc8adfd9fd))
* rename 'raw' to 'rawData' for consistency and add ancestor test data ([2aa64e2](https://github.com/Tracktor/treege-consumer/commit/2aa64e20dcc262910c9e68a9733c13fcd3d6bcbe))
* replace custom property getter with getObjectValue utility in FieldFactory and ApiAutocomplete ([b4ce894](https://github.com/Tracktor/treege-consumer/commit/b4ce8941b3161ce8d769da3dfd50636f84369635))
* replace type checks with isString utility for ancestorValue handling across components ([29aecac](https://github.com/Tracktor/treege-consumer/commit/29aecacb64e2c0243e58d4a24ac2192ce747ee95))
* simplify ancestor value consumption logic in FieldFactory component ([f768dcd](https://github.com/Tracktor/treege-consumer/commit/f768dcd0d85879484cdb9ff000b53875d7f5d9a0))
* simplify isActive calculation in SwitchField component ([6b5ac26](https://github.com/Tracktor/treege-consumer/commit/6b5ac26b907095e3d80a81edacd4ea9c336e7448))
* simplify isActive handling in CheckBoxField component ([bac66b5](https://github.com/Tracktor/treege-consumer/commit/bac66b5c8bd350fda7709816ef52ea30eee2e793))
* sync ancestor value with onChange handler in Select component ([9f60e37](https://github.com/Tracktor/treege-consumer/commit/9f60e37a2b8aa7e272baeb5f01c1fd03ef97635e))
* update @tracktor/react-utils dependency to version 1.23.0 ([ed67141](https://github.com/Tracktor/treege-consumer/commit/ed6714160524ba69dfc910f90a5aaca04941a126))
* update @tracktor/react-utils to version 1.24.0 and enhance parameter string conversion logic ([ac25d6c](https://github.com/Tracktor/treege-consumer/commit/ac25d6cef303355cc647eec9545f84659cb215cc))
* update @tracktor/types-treege dependency to version 0.3.14 and clean up onSubmit logic in TreegeConsumer ([cb88e87](https://github.com/Tracktor/treege-consumer/commit/cb88e87c172106bf1c9525c805197a2689e3c4b7))
* update address validation to include streetNumber in AddressAdapterParams ([37955d9](https://github.com/Tracktor/treege-consumer/commit/37955d92e376c5ceee09448272ac1ea3086b9d4e))
* update ancestor handling to use autocomplete test data and refactor raw data access ([1c209f1](https://github.com/Tracktor/treege-consumer/commit/1c209f18c5c98fd668a3b21decf079b02a14fe82))
* update ApiAutocomplete to use dynamic URL for search requests ([1b645de](https://github.com/Tracktor/treege-consumer/commit/1b645de36aa4ffb40cb16127792a7c93cc8769a3))
* update App and DatePicker components to integrate testBookingWorksiteHours and enhance ancestorValue handling ([c79d7be](https://github.com/Tracktor/treege-consumer/commit/c79d7be845c732ade66e080746497061ade0e136))
* update App component to use basicExample data and clean up TextField component's ancestorValue handling ([94becf1](https://github.com/Tracktor/treege-consumer/commit/94becf16ef67ff221014e703ba8a2581eb4791be))
* update App component to use testWorksiteHours data and enhance DynamicSelect and TimeRange components with ancestorValue handling ([c3a27c3](https://github.com/Tracktor/treege-consumer/commit/c3a27c3bbc639b27561338c2a096cf572aac397d))
* update DatePicker to remove null value assignment in value prop ([ffe2dd8](https://github.com/Tracktor/treege-consumer/commit/ffe2dd86f5607326f55baf7e8f43d3b265d86f65))
* update environment variable access for authorization and Google API key ([ec4e3c8](https://github.com/Tracktor/treege-consumer/commit/ec4e3c8a0b451340ce08951052ed175d1ce532b5))
* update FieldFactory and TextField to support ancestor value handling ([0b6339b](https://github.com/Tracktor/treege-consumer/commit/0b6339b163089c18e77d741259057da9852d38d9))
* update gitignore ([158df6a](https://github.com/Tracktor/treege-consumer/commit/158df6a71b209fe7893d590047246c30afc1d62d))
* use isArray and isObject for improved type checks in paramsBuilder ([13a6581](https://github.com/Tracktor/treege-consumer/commit/13a6581485570cbcf7a2ea35759c7acfcd27cb84))
* use isObject and isArray utils for consistent type checks in adaptRouteResponseToOptions ([3397bdf](https://github.com/Tracktor/treege-consumer/commit/3397bdf898ddfa8470d20f5b4e080d413a6fb225))
* use isObject and related utils for safer type checks and value extraction across components ([0dfc2d5](https://github.com/Tracktor/treege-consumer/commit/0dfc2d5ccbf86d2285a3d9728a9a71a934f9254c))


### Bug Fixes

* correct typo in ResponseGeocodingAddress interface name in addressToGoogleAutocompleteAdapter ([40bbbb6](https://github.com/Tracktor/treege-consumer/commit/40bbbb603937b48bc1acfe11ef0773453b534a92))

## [2.0.0] - 2025-06-19

### New Features
- **Ancestor injection in tree structures:** Added support for injecting ancestor field values directly into `TreeNode` structures, enabling nested context propagation throughout dynamic form trees.
- **UUID-based TreeNode retrieval utility:** Introduced a utility to efficiently retrieve tree nodes by UUID, simplifying lookup and state mapping in complex trees.
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
