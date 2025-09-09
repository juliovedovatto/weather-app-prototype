/**
 * Application configuration barrel.
 *
 * This directory centralizes static configuration objects and constants.
 * Organize files by domain (e.g. weather, ui, app, auth) to preserve
 * separation of concerns and keep feature configuration decoupled from
 * component implementation details.
 *
 * Add new domain-specific config files here and export them via this index
 * so consumers can import from '@/config' without deep paths.
 */
export * from './app';
