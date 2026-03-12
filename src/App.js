import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabaseClient";

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, stroke = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const IconUser     = () => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />;
const IconLock     = () => <Icon d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" />;
const IconChevron  = () => <Icon d="M9 18l6-6-6-6" />;
const IconStar     = () => <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
const IconCog      = () => <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />;
const IconLogout   = () => <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />;
const IconCalendar = () => <Icon d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18" />;
const IconPen      = () => <Icon d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />;
const IconUpload   = () => <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />;
const IconPlus     = () => <Icon d="M12 5v14M5 12h14" />;
const IconTrash    = () => <Icon d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" size={16} />;
const IconEdit     = ({ size = 20 }) => <Icon d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" size={size} />;
const IconTable    = ({ size = 20 }) => <Icon d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" size={size} />;
const IconDownload = ({ size = 20 }) => <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" size={size} />;
const IconUsers    = ({ size = 20 }) => <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" size={size} />;
const IconLoader   = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
    </path>
  </svg>
);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split("T")[0];
const fmtDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #1a1a2e; --ink2: #3d3d5c; --ink3: #7b7b9d;
    --paper: #f8f7f4; --paper2: #eeecea; --paper3: #e3e0da;
    --accent: #2d6a4f; --accent2: #40916c; --accent-light: #d8f3dc;
    --warn: #e63946; --warn-light: #fde8ea;
    --gold: #e9c46a; --gold-light: #fef9e7;
    --radius: 12px;
    --shadow: 0 2px 8px rgba(26,26,46,0.08), 0 1px 3px rgba(26,26,46,0.05);
    --shadow-lg: 0 8px 32px rgba(26,26,46,0.12), 0 2px 8px rgba(26,26,46,0.06);
  }
  html, body, #root { height: 100%; font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); }
  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* LOGIN */
  .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--ink); position: relative; overflow: hidden; }
  .login-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 60% 40%, #2d6a4f22 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 20% 80%, #40916c11 0%, transparent 60%); }
  .login-card { position: relative; z-index: 1; background: #fff; border-radius: 20px; padding: 52px 48px; width: 100%; max-width: 420px; box-shadow: var(--shadow-lg); }
  .login-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 36px; }
  .login-logo-mark { width: 36px; height: 36px; background: var(--accent); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-family: 'DM Serif Display', serif; font-size: 18px; }
  .login-logo-text { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--ink); }
  .login-title { font-family: 'DM Serif Display', serif; font-size: 28px; color: var(--ink); margin-bottom: 6px; }
  .login-sub { color: var(--ink3); font-size: 14px; margin-bottom: 32px; }
  .field { margin-bottom: 18px; }
  .field label { display: block; font-size: 12px; font-weight: 600; color: var(--ink2); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 6px; }
  .field-inner { position: relative; display: flex; align-items: center; }
  .field-icon { position: absolute; left: 14px; color: var(--ink3); pointer-events: none; }
  .field input { width: 100%; padding: 12px 14px 12px 42px; border: 1.5px solid var(--paper3); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--ink); background: var(--paper); outline: none; transition: border-color .2s; }
  .field input:focus { border-color: var(--accent); background: #fff; }
  .btn-primary { width: 100%; padding: 14px; background: var(--accent); color: #fff; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: background .2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .btn-primary:hover { background: var(--accent2); }
  .btn-primary:disabled { opacity: .6; cursor: not-allowed; }
  .login-switch { text-align: center; margin-top: 20px; font-size: 13px; color: var(--ink3); }
  .login-switch span { color: var(--accent); font-weight: 600; cursor: pointer; }
  .login-switch span:hover { text-decoration: underline; }
  .login-error { color: var(--warn); font-size: 13px; margin-bottom: 14px; background: var(--warn-light); padding: 10px 14px; border-radius: 8px; }
  .login-ok { color: var(--accent); font-size: 13px; margin-bottom: 14px; background: var(--accent-light); padding: 10px 14px; border-radius: 8px; }

  /* TOPBAR */
  .topbar { height: 60px; background: #fff; border-bottom: 1px solid var(--paper3); display: flex; align-items: center; padding: 0 24px; gap: 12px; position: sticky; top: 0; z-index: 100; }
  .topbar-logo { font-family: 'DM Serif Display', serif; font-size: 18px; color: var(--ink); display: flex; align-items: center; gap: 8px; }
  .topbar-logo-mark { width: 28px; height: 28px; background: var(--accent); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #fff; font-family: 'DM Serif Display', serif; font-size: 14px; }
  .topbar-spacer { flex: 1; }
  .topbar-user { font-size: 13px; color: var(--ink3); display: flex; align-items: center; gap: 6px; }
  .topbar-avatar { width: 30px; height: 30px; background: var(--accent-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--accent); font-weight: 700; font-size: 13px; }
  .btn-icon { background: none; border: none; cursor: pointer; color: var(--ink3); display: flex; align-items: center; justify-content: center; padding: 6px; border-radius: 8px; transition: background .15s, color .15s; }
  .btn-icon:hover { background: var(--paper2); color: var(--ink); }

  /* MAIN */
  .main { flex: 1; padding: 32px 24px; max-width: 960px; margin: 0 auto; width: 100%; }
  .page-header { margin-bottom: 28px; }
  .page-header h1 { font-family: 'DM Serif Display', serif; font-size: 30px; color: var(--ink); margin-bottom: 4px; }
  .page-header p { color: var(--ink3); font-size: 14px; }
  .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--ink3); margin-bottom: 8px; }
  .breadcrumb-link { cursor: pointer; color: var(--accent); font-weight: 500; }
  .breadcrumb-link:hover { text-decoration: underline; }

  /* AULAS */
  .aulas-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; }
  .aula-card { background: #fff; border: 1.5px solid var(--paper3); border-radius: var(--radius); padding: 24px 20px; cursor: pointer; transition: border-color .2s, box-shadow .2s, transform .15s; display: flex; flex-direction: column; gap: 4px; }
  .aula-card:hover { border-color: var(--accent); box-shadow: var(--shadow); transform: translateY(-2px); }
  .aula-tag { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; color: var(--accent); margin-bottom: 4px; }
  .aula-name { font-family: 'DM Serif Display', serif; font-size: 28px; color: var(--ink); line-height: 1; }
  .aula-meta { font-size: 13px; color: var(--ink3); margin-top: 8px; }
  .aula-chevron { align-self: flex-end; color: var(--paper3); margin-top: 12px; transition: color .2s; }
  .aula-card:hover .aula-chevron { color: var(--accent); }
  .add-aula-card { background: var(--paper); border: 2px dashed var(--paper3); border-radius: var(--radius); padding: 24px 20px; cursor: pointer; transition: border-color .2s, background .2s; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 140px; }
  .add-aula-card:hover { border-color: var(--accent); background: var(--accent-light); }
  .add-aula-text { font-size: 13px; color: var(--ink3); font-weight: 500; }

  /* AULA VIEW */
  .aula-actions { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px; }
  .action-btn { background: #fff; border: 2px solid var(--paper3); border-radius: 16px; padding: 32px 24px; cursor: pointer; text-align: left; transition: all .2s; display: flex; flex-direction: column; gap: 10px; }
  .action-btn:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
  .action-btn.asistencia:hover { border-color: var(--accent); }
  .action-btn.notas:hover { border-color: #e9c46a; }
  .action-btn-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  .action-btn.asistencia .action-btn-icon { background: var(--accent-light); color: var(--accent); }
  .action-btn.notas .action-btn-icon { background: var(--gold-light); color: #b7860b; }
  .action-btn-title { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--ink); }
  .action-btn-desc { font-size: 13px; color: var(--ink3); line-height: 1.5; }
  .alumno-mgr-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; background: #fff; border: 1.5px solid var(--paper3); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: var(--ink2); cursor: pointer; transition: border-color .2s, color .2s; margin-bottom: 20px; }
  .alumno-mgr-btn:hover { border-color: var(--accent); color: var(--accent); }

  /* PANEL */
  .panel { background: #fff; border: 1.5px solid var(--paper3); border-radius: 16px; padding: 28px; }
  .panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; padding-bottom: 18px; border-bottom: 1px solid var(--paper2); }
  .panel-title { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--ink); }
  .panel-date { font-size: 13px; color: var(--ink3); background: var(--paper); padding: 6px 12px; border-radius: 20px; display: flex; align-items: center; gap: 6px; }

  /* ASISTENCIA */
  .alumno-list { display: flex; flex-direction: column; gap: 2px; }
  .alumno-row { display: flex; align-items: center; padding: 10px 12px; border-radius: 8px; transition: background .15s; }
  .alumno-row:hover { background: var(--paper); }
  .alumno-num { font-size: 12px; color: var(--ink3); width: 28px; flex-shrink: 0; }
  .alumno-name { flex: 1; font-size: 14px; color: var(--ink); }
  .toggle { position: relative; width: 44px; height: 24px; flex-shrink: 0; }
  .toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
  .toggle-track { position: absolute; inset: 0; background: var(--paper3); border-radius: 12px; cursor: pointer; transition: background .2s; }
  .toggle input:checked + .toggle-track { background: var(--accent); }
  .toggle-thumb { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: #fff; border-radius: 50%; transition: transform .2s; pointer-events: none; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
  .toggle input:checked ~ .toggle-thumb { transform: translateX(20px); }
  .status-badge { font-size: 11px; font-weight: 600; margin-left: 10px; padding: 2px 8px; border-radius: 20px; width: 76px; text-align: center; }
  .status-badge.present { background: var(--accent-light); color: var(--accent); }
  .status-badge.absent { background: var(--warn-light); color: var(--warn); }
  .status-badge.tardanza { background: #fef9e7; color: #b7860b; }
  .status-badge.retiro { background: #f0f0ff; color: #5c5cb8; }
  .estado-btns { display: flex; gap: 4px; margin-left: 10px; }
  .estado-btn { padding: 4px 10px; border-radius: 20px; border: 1.5px solid var(--paper3); background: #fff; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; cursor: pointer; transition: all .15s; }
  .estado-btn.active-presente { background: var(--accent-light); border-color: var(--accent); color: var(--accent); }
  .estado-btn.active-tardanza { background: #fef9e7; border-color: #e9c46a; color: #b7860b; }
  .estado-btn.active-retiro { background: #f0f0ff; border-color: #9999dd; color: #5c5cb8; }
  .estado-btn.active-ausente { background: var(--warn-light); border-color: var(--warn); color: var(--warn); }
  .fecha-selector { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
  .fecha-input { padding: 8px 14px; border: 1.5px solid var(--paper3); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink); background: var(--paper); outline: none; transition: border-color .2s; }
  .fecha-input:focus { border-color: var(--accent); background: #fff; }
  .summary-bar { display: flex; gap: 16px; margin-bottom: 18px; }
  .summary-chip { font-size: 13px; padding: 6px 14px; border-radius: 20px; font-weight: 500; }
  .summary-chip.green { background: var(--accent-light); color: var(--accent); }
  .summary-chip.red { background: var(--warn-light); color: var(--warn); }
  .save-row { margin-top: 20px; display: flex; justify-content: flex-end; gap: 10px; }
  .btn-save { padding: 11px 28px; background: var(--accent); color: #fff; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .2s; }
  .btn-save:hover { background: var(--accent2); }
  .btn-save:disabled { opacity: .5; cursor: not-allowed; }
  .btn-ghost { padding: 11px 20px; background: none; border: 1.5px solid var(--paper3); color: var(--ink2); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; transition: border-color .2s; }
  .btn-ghost:hover { border-color: var(--ink3); }

  /* NOTAS */
  .nota-form { display: flex; flex-direction: column; gap: 20px; }
  .nota-select { width: 100%; padding: 12px 14px; border: 1.5px solid var(--paper3); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink); background: var(--paper); outline: none; appearance: none; transition: border-color .2s; }
  .nota-select:focus { border-color: var(--accent); background: #fff; }
  .nota-row { display: grid; grid-template-columns: 1fr 2fr; gap: 14px; }
  .nota-input { width: 100%; padding: 12px 14px; border: 1.5px solid var(--paper3); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink); background: var(--paper); outline: none; transition: border-color .2s; }
  .nota-input:focus { border-color: #e9c46a; background: #fff; }
  .nota-preview { background: var(--gold-light); border: 1.5px solid #e9c46a33; border-radius: 12px; padding: 18px; display: flex; justify-content: space-between; align-items: center; }
  .nota-preview-label { font-size: 13px; color: var(--ink3); }
  .nota-preview-val { font-family: 'DM Serif Display', serif; font-size: 36px; color: var(--ink); }
  .nota-preview-sub { font-size: 12px; color: var(--ink3); margin-top: 2px; }
  .registros-title { font-size: 14px; font-weight: 600; color: var(--ink2); margin-bottom: 12px; text-transform: uppercase; letter-spacing: .05em; }
  .registro-list { display: flex; flex-direction: column; gap: 8px; max-height: 280px; overflow-y: auto; }
  .registro-item { display: flex; align-items: center; gap: 12px; background: var(--paper); border-radius: 8px; padding: 10px 14px; font-size: 13px; }
  .registro-item .ri-date { color: var(--ink3); flex-shrink: 0; }
  .registro-item .ri-name { flex: 1; color: var(--ink); font-weight: 500; }
  .registro-item .ri-val { font-weight: 700; color: var(--ink); }
  .registro-item .ri-label { color: var(--ink3); margin-left: auto; }
  .empty-state { text-align: center; padding: 40px 20px; color: var(--ink3); font-size: 14px; }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(26,26,46,.45); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: #fff; border-radius: 20px; width: 100%; max-width: 560px; box-shadow: var(--shadow-lg); overflow: hidden; }
  .modal-header { padding: 24px 28px 20px; border-bottom: 1px solid var(--paper2); display: flex; align-items: center; justify-content: space-between; }
  .modal-title { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--ink); }
  .modal-close { background: none; border: none; cursor: pointer; color: var(--ink3); font-size: 22px; line-height: 1; padding: 4px 8px; border-radius: 6px; transition: background .15s; }
  .modal-close:hover { background: var(--paper2); }
  .modal-body { padding: 24px 28px; max-height: 72vh; overflow-y: auto; }
  .modal-footer { padding: 16px 28px; border-top: 1px solid var(--paper2); display: flex; justify-content: flex-end; gap: 10px; }
  .modal-tabs { display: flex; gap: 0; margin-bottom: 22px; border: 1.5px solid var(--paper3); border-radius: 10px; overflow: hidden; }
  .modal-tab { flex: 1; padding: 10px; background: none; border: none; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: var(--ink3); cursor: pointer; transition: background .15s, color .15s; }
  .modal-tab.active { background: var(--ink); color: #fff; }
  .dropzone { border: 2px dashed var(--paper3); border-radius: 14px; padding: 40px 20px; text-align: center; cursor: pointer; transition: border-color .2s, background .2s; }
  .dropzone:hover, .dropzone.drag { border-color: var(--accent); background: var(--accent-light); }
  .dropzone-icon { color: var(--ink3); margin-bottom: 12px; }
  .dropzone-title { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
  .dropzone-sub { font-size: 13px; color: var(--ink3); }
  .dropzone input[type=file] { display: none; }
  .template-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; font-size: 13px; color: var(--accent); font-weight: 500; cursor: pointer; text-decoration: underline; }
  .preview-list { display: flex; flex-direction: column; gap: 4px; margin-top: 16px; max-height: 240px; overflow-y: auto; }
  .preview-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: var(--paper); border-radius: 8px; font-size: 13px; }
  .preview-num { color: var(--ink3); width: 24px; flex-shrink: 0; font-size: 12px; }
  .preview-name { flex: 1; color: var(--ink); }
  .preview-del { background: none; border: none; cursor: pointer; color: var(--ink3); padding: 2px 4px; border-radius: 4px; display: flex; align-items: center; transition: color .15s; }
  .preview-del:hover { color: var(--warn); }
  .manual-input-row { display: flex; gap: 8px; margin-bottom: 12px; }
  .manual-input { flex: 1; padding: 10px 14px; border: 1.5px solid var(--paper3); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink); background: var(--paper); outline: none; transition: border-color .2s; }
  .manual-input:focus { border-color: var(--accent); background: #fff; }
  .btn-add { padding: 10px 16px; background: var(--accent); color: #fff; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background .2s; white-space: nowrap; }
  .btn-add:hover { background: var(--accent2); }
  .parse-error { background: var(--warn-light); color: var(--warn); border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-top: 10px; }
  .parse-ok { background: var(--accent-light); color: var(--accent); border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-top: 10px; }

  /* RESUMEN */
  .resumen-search { width: 100%; padding: 11px 16px; border: 1.5px solid var(--paper3); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink); background: var(--paper); outline: none; margin-bottom: 16px; transition: border-color .2s; }
  .resumen-search:focus { border-color: var(--accent); background: #fff; }
  .resumen-tabs { display: flex; gap: 6px; margin-bottom: 20px; }
  .rtab { padding: 7px 16px; border-radius: 20px; border: 1.5px solid var(--paper3); background: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: var(--ink3); cursor: pointer; transition: all .18s; }
  .rtab.active { background: var(--ink); border-color: var(--ink); color: #fff; }
  .resumen-grid { display: flex; flex-direction: column; gap: 10px; }
  .alumno-card { background: #fff; border: 1.5px solid var(--paper3); border-radius: 14px; overflow: hidden; transition: box-shadow .2s; }
  .alumno-card:hover { box-shadow: var(--shadow); }
  .alumno-card-header { display: flex; align-items: center; gap: 14px; padding: 16px 20px; cursor: pointer; }
  .alumno-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--paper2); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; color: var(--ink2); flex-shrink: 0; }
  .alumno-card-name { flex: 1; font-size: 14px; font-weight: 600; color: var(--ink); }
  .alumno-card-stats { display: flex; gap: 10px; align-items: center; }
  .astat { display: flex; flex-direction: column; align-items: center; gap: 1px; }
  .astat-val { font-size: 15px; font-weight: 700; color: var(--ink); }
  .astat-val.green { color: var(--accent); }
  .astat-val.red { color: var(--warn); }
  .astat-val.gold { color: #b7860b; }
  .astat-lbl { font-size: 10px; color: var(--ink3); text-transform: uppercase; letter-spacing: .05em; }
  .astat-sep { width: 1px; height: 28px; background: var(--paper3); }
  .alumno-card-expand { color: var(--ink3); transition: transform .2s; margin-left: 8px; }
  .alumno-card-expand.open { transform: rotate(90deg); }
  .alumno-card-body { border-top: 1px solid var(--paper2); padding: 16px 20px; background: var(--paper); }
  .alumno-body-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .alumno-section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--ink3); margin-bottom: 10px; }
  .asist-calendar { display: flex; flex-wrap: wrap; gap: 5px; }
  .asist-dot { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; }
  .asist-dot.p { background: var(--accent-light); color: var(--accent); }
  .asist-dot.a { background: var(--warn-light); color: var(--warn); }
  .nota-pill { display: flex; justify-content: space-between; align-items: center; padding: 7px 10px; background: #fff; border-radius: 8px; margin-bottom: 5px; font-size: 13px; }
  .nota-pill-label { color: var(--ink2); }
  .nota-pill-val { font-weight: 700; padding: 2px 10px; border-radius: 12px; font-size: 13px; }
  .nota-pill-val.alta { background: var(--accent-light); color: var(--accent); }
  .nota-pill-val.media { background: var(--gold-light); color: #b7860b; }
  .nota-pill-val.baja { background: var(--warn-light); color: var(--warn); }
  .promedio-bar { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
  .bar-track { flex: 1; height: 6px; background: var(--paper3); border-radius: 3px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 3px; transition: width .6s ease; }
  .resumen-stats-top { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 20px; }
  .rst { background: #fff; border: 1.5px solid var(--paper3); border-radius: 12px; padding: 14px 16px; }
  .rst-lbl { font-size: 11px; text-transform: uppercase; letter-spacing: .07em; color: var(--ink3); margin-bottom: 4px; }
  .rst-val { font-family: 'DM Serif Display', serif; font-size: 24px; color: var(--ink); }
  .rst-val.green { color: var(--accent); }
  .rst-val.red { color: var(--warn); }
  .rst-val.gold { color: #b7860b; }

  /* CONFIG */
  .sub-card { background: linear-gradient(135deg, #1a1a2e, #2d3561); color: #fff; border-radius: 16px; padding: 28px; margin-bottom: 20px; }
  .sub-card-title { font-family: 'DM Serif Display', serif; font-size: 20px; margin-bottom: 6px; }
  .sub-card-sub { font-size: 13px; opacity: .6; margin-bottom: 20px; }
  .sub-stat { background: rgba(255,255,255,.08); border-radius: 10px; padding: 14px 18px; margin-bottom: 10px; }
  .sub-stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; opacity: .5; margin-bottom: 4px; }
  .sub-stat-val { font-size: 15px; font-weight: 600; }
  .sub-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(233,196,106,.15); color: var(--gold); border: 1px solid rgba(233,196,106,.3); border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: 600; margin-top: 14px; }

  /* LOADING */
  .loading-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--paper); color: var(--ink3); gap: 10px; font-size: 15px; }

  /* NUEVA AULA FORM */
  .nueva-aula-form { display: flex; flex-direction: column; gap: 16px; }

  .toast { position: fixed; bottom: 24px; right: 24px; background: var(--ink); color: #fff; padding: 13px 20px; border-radius: 10px; font-size: 14px; box-shadow: var(--shadow-lg); z-index: 1000; animation: slideUp .25s ease; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  /* PLANILLA */
  .planilla-wrap { overflow-x: auto; border-radius: 12px; border: 1.5px solid var(--paper3); }
  .planilla-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .planilla-table th { background: var(--ink); color: #fff; padding: 10px 14px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; white-space: nowrap; }
  .planilla-table th:first-child { border-radius: 10px 0 0 0; }
  .planilla-table th:last-child { border-radius: 0 10px 0 0; }
  .planilla-table td { padding: 9px 14px; border-bottom: 1px solid var(--paper2); color: var(--ink); vertical-align: middle; }
  .planilla-table tr:last-child td { border-bottom: none; }
  .planilla-table tr:hover td { background: var(--paper); }
  .planilla-table td.num { text-align: center; font-weight: 700; }
  .planilla-table td.num.alta { color: var(--accent); }
  .planilla-table td.num.media { color: #b7860b; }
  .planilla-table td.num.baja { color: var(--warn); }
  .planilla-table td.asist-cell { text-align: center; }
  .obs-input { width: 100%; border: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink); outline: none; padding: 2px 4px; border-radius: 4px; }
  .obs-input:focus { background: var(--paper2); }
  .planilla-actions { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; align-items: center; }
  .btn-excel { display: inline-flex; align-items: center; gap: 7px; padding: 10px 20px; background: #217346; color: #fff; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .2s; }
  .btn-excel:hover { background: #1a5c38; }
  .edit-aula-btn { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; background: none; border: 1.5px solid var(--paper3); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; color: var(--ink3); cursor: pointer; transition: all .15s; margin-left: 8px; }
  .edit-aula-btn:hover { border-color: var(--accent); color: var(--accent); }

  /* ADMIN */
  .admin-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
  .admin-stats { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 28px; }
  .admin-stat { background: #fff; border: 1.5px solid var(--paper3); border-radius: 12px; padding: 16px 18px; }
  .admin-stat-lbl { font-size: 11px; text-transform: uppercase; letter-spacing: .07em; color: var(--ink3); margin-bottom: 4px; }
  .admin-stat-val { font-family: 'DM Serif Display', serif; font-size: 28px; color: var(--ink); }
  .user-list { display: flex; flex-direction: column; gap: 10px; }
  .user-card { background: #fff; border: 1.5px solid var(--paper3); border-radius: 14px; padding: 18px 22px; display: flex; align-items: center; gap: 16px; transition: box-shadow .2s; }
  .user-card:hover { box-shadow: var(--shadow); }
  .user-card.inactivo { opacity: .55; }
  .user-avatar-admin { width: 40px; height: 40px; border-radius: 50%; background: var(--accent-light); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: var(--accent); flex-shrink: 0; }
  .user-avatar-admin.inactivo { background: var(--paper3); color: var(--ink3); }
  .user-info { flex: 1; cursor: pointer; }
  .user-name { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
  .user-email { font-size: 12px; color: var(--ink3); }
  .user-meta { font-size: 12px; color: var(--ink3); margin-top: 3px; }
  .user-badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; margin-left: 8px; }
  .user-badge.activo { background: var(--accent-light); color: var(--accent); }
  .user-badge.inactivo { background: var(--warn-light); color: var(--warn); }
  .toggle-activo { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .toggle-activo-label { font-size: 12px; color: var(--ink3); }
  .admin-nav-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: var(--ink); color: #fff; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; }
  .user-aulas { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--paper2); }
  .user-aula-item { display: flex; align-items: center; justify-content: space-between; padding: 6px 0; font-size: 13px; color: var(--ink2); }

  @media (max-width: 700px) {
    .aula-actions { grid-template-columns: 1fr; }
    .nota-row { grid-template-columns: 1fr; }
    .login-card { padding: 36px 24px; margin: 16px; }
    .main { padding: 20px 16px; }
    .resumen-stats-top { grid-template-columns: 1fr 1fr; }
    .alumno-body-grid { grid-template-columns: 1fr; }
  }
`;

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg }) {
  return msg ? <div className="toast">{msg}</div> : null;
}

// ─── LOGIN / REGISTRO ─────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !pass) { setErr("Completá todos los campos."); return; }
    setLoading(true); setErr("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    setLoading(false);
    if (error) { setErr("Correo o contraseña incorrectos."); return; }
    if (data.user.id !== "088cf6c0-7e53-4999-ae1f-7f0c9222edbf") {
      const { data: perfil } = await supabase.from("perfiles").select("activo").eq("id", data.user.id).single();
      if (perfil && !perfil.activo) {
        await supabase.auth.signOut();
        setLoading(false);
        setErr("Tu cuenta está pendiente de activación. Realizá el pago y enviá el comprobante por WhatsApp.");
        return;
      }
    }
    onLogin(data.user);
  };

  const handleRegistro = async () => {
    if (!email || !pass || !nombre) { setErr("Completá todos los campos."); return; }
    if (pass.length < 6) { setErr("La contraseña debe tener al menos 6 caracteres."); return; }
    setLoading(true); setErr("");
    const { data, error } = await supabase.auth.signUp({
      email, password: pass,
      options: { data: { nombre_completo: nombre } }
    });
    if (error) { setLoading(false); setErr(error.message); return; }
    // Crear perfil manualmente - inactivo hasta aprobación del admin
    if (data?.user) {
      await supabase.from("perfiles").insert({
        id: data.user.id,
        email: email,
        nombre: nombre,
        activo: false
      });
    }
    setLoading(false);
    setRegistroExitoso(true);
  };

  const handle = modo === "login" ? handleLogin : handleRegistro;

  if (registroExitoso) return (
    <div className="login-wrap">
      <div className="login-bg" />
      <div className="login-card" style={{ maxWidth: 460 }}>
        <div className="login-logo" style={{ justifyContent: "center" }}>
          <div className="login-logo-mark">A</div>
          <span className="login-logo-text">Aula</span>
        </div>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", marginBottom: 6, textAlign: "center" }}>¡Ya casi estás!</h2>
        <p style={{ color: "var(--ink3)", fontSize: 14, marginBottom: 20, textAlign: "center" }}>Tu cuenta fue creada. Completá el pago para activarla.</p>

        <div style={{ background: "var(--accent-light)", border: "1.5px solid var(--accent)", borderRadius: 12, padding: "16px 20px", marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--accent)", marginBottom: 10 }}>Paso 1 — Realizá el pago</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "var(--ink2)" }}>Alias Mercado Pago</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>aula.app</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--ink2)" }}>Monto mensual</span>
            <span style={{ fontWeight: 700, fontSize: 18, color: "var(--accent)" }}>$ 2000</span>
          </div>
        </div>

        <div style={{ background: "var(--gold-light)", border: "1.5px solid #e9c46a55", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "#b7860b", marginBottom: 8 }}>Paso 2 — Enviá el comprobante</div>
          <p style={{ fontSize: 13, color: "var(--ink2)", marginBottom: 12 }}>Mandanos el comprobante por WhatsApp y te activamos en minutos.</p>
          <a
            href={"https://wa.me/543772501736?text=" + encodeURIComponent("Hola! Me registré en Aula con el email " + email + " y quiero activar mi cuenta. Te mando el comprobante del pago de $2000.")}
            target="_blank"
            rel="noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", borderRadius: 10, padding: "12px 20px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
          >
            <span style={{ fontSize: 18 }}>💬</span> Enviar comprobante por WhatsApp
          </a>
        </div>

        <button className="btn-ghost" style={{ width: "100%" }} onClick={() => { setRegistroExitoso(false); setModo("login"); }}>
          Ya pagué, ir al inicio de sesión
        </button>
      </div>
    </div>
  );

  return (
    <div className="login-wrap">
      <div className="login-bg" />
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-mark">A</div>
          <span className="login-logo-text">Aula</span>
        </div>
        <h1 className="login-title">Bienvenido</h1>
        <p className="login-sub">Ingresá a tu panel docente</p>
        {err && <div className="login-error">{err}</div>}
        {ok && <div className="login-ok">{ok}</div>}
        <div className="field">
          <label>Correo electrónico</label>
          <div className="field-inner">
            <span className="field-icon"><IconUser /></span>
            <input type="email" placeholder="tu@correo.com" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
        </div>
        <div className="field">
          <label>Contraseña</label>
          <div className="field-inner">
            <span className="field-icon"><IconLock /></span>
            <input type="password" placeholder="••••••••" value={pass} onChange={e => { setPass(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
        </div>
        <button className="btn-primary" onClick={handleLogin} disabled={loading}>
          {loading && <IconLoader />}
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
        <div style={{ marginTop: 20, background: "var(--gold-light)", border: "1.5px solid #e9c46a88", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#b7860b", marginBottom: 6 }}>¿Querés registrarte?</div>
          <p style={{ fontSize: 13, color: "var(--ink2)", marginBottom: 10, lineHeight: 1.5 }}>
            Enviá <strong>$2000</strong> por Mercado Pago al alias <strong>aula.app</strong> y mandá el comprobante por WhatsApp para que te creemos la cuenta.
          </p>
          <a
            href="https://wa.me/543772501736?text=Hola!%20Quiero%20registrarme%20en%20Aula.%20Te%20mando%20el%20comprobante%20del%20pago."
            target="_blank"
            rel="noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", borderRadius: 10, padding: "10px 16px", fontWeight: 700, fontSize: 13, textDecoration: "none" }}
          >
            <span style={{ fontSize: 16 }}>💬</span> Enviar comprobante por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
function Topbar({ user, onLogout, onConfig, onAdmin }) {
  const nombre = user.user_metadata?.nombre_completo || user.email;
  const initials = nombre.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="topbar">
      <div className="topbar-logo"><div className="topbar-logo-mark">A</div>Aula</div>
      <div className="topbar-spacer" />
      <div className="topbar-user">
        <span style={{ fontSize: 13, color: "var(--ink3)" }}>{nombre}</span>
        <div className="topbar-avatar">{initials}</div>
      </div>
      {onAdmin && (
        <button className="btn-icon" title="Panel Admin" onClick={onAdmin} style={{ color: "var(--accent)", fontWeight: 700 }}>
          <IconUsers size={18} />
        </button>
      )}
      <button className="btn-icon" title="Configuración" onClick={onConfig}><IconCog /></button>
      <button className="btn-icon" title="Cerrar sesión" onClick={onLogout}><IconLogout /></button>
    </div>
  );
}

// ─── MODAL NUEVA AULA ─────────────────────────────────────────────────────────
function NuevaAulaModal({ onClose, onCrear }) {
  const [nombre, setNombre] = useState("");
  const [materia, setMateria] = useState("");
  const [loading, setLoading] = useState(false);

  const crear = async () => {
    if (!nombre.trim() || !materia.trim()) return;
    setLoading(true);
    await onCrear({ nombre: nombre.trim(), materia: materia.trim() });
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Nueva Aula</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="nueva-aula-form">
            <div className="field">
              <label>Nombre del aula</label>
              <input className="manual-input" style={{ width: "100%" }} type="text" placeholder="ej: 6° A" value={nombre} onChange={e => setNombre(e.target.value)} onKeyDown={e => e.key === "Enter" && crear()} />
            </div>
            <div className="field">
              <label>Materia</label>
              <input className="manual-input" style={{ width: "100%" }} type="text" placeholder="ej: Lengua y Literatura" value={materia} onChange={e => setMateria(e.target.value)} onKeyDown={e => e.key === "Enter" && crear()} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-save" onClick={crear} disabled={!nombre.trim() || !materia.trim() || loading}>
            {loading ? "Creando..." : "Crear aula"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL EDITAR AULA ───────────────────────────────────────────────────────
function EditarAulaModal({ aula, onClose, onGuardar }) {
  const [nombre, setNombre] = useState(aula.nombre);
  const [materia, setMateria] = useState(aula.materia);
  const [loading, setLoading] = useState(false);

  const guardar = async () => {
    if (!nombre.trim() || !materia.trim()) return;
    setLoading(true);
    await supabase.from("aulas").update({ nombre: nombre.trim(), materia: materia.trim() }).eq("id", aula.id);
    setLoading(false);
    onGuardar({ ...aula, nombre: nombre.trim(), materia: materia.trim() });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Editar Aula</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="nueva-aula-form">
            <div className="field">
              <label>Nombre del aula</label>
              <input className="manual-input" style={{ width: "100%" }} type="text" value={nombre} onChange={e => setNombre(e.target.value)} onKeyDown={e => e.key === "Enter" && guardar()} />
            </div>
            <div className="field">
              <label>Materia</label>
              <input className="manual-input" style={{ width: "100%" }} type="text" value={materia} onChange={e => setMateria(e.target.value)} onKeyDown={e => e.key === "Enter" && guardar()} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-save" onClick={guardar} disabled={!nombre.trim() || !materia.trim() || loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, onSelect }) {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalNueva, setModalNueva] = useState(false);
  const [aulaEditar, setAulaEditar] = useState(null);

  const cargarAulas = useCallback(async () => {
    const { data } = await supabase.from("aulas").select("*").eq("docente_id", user.id).order("created_at");
    setAulas(data || []);
    setLoading(false);
  }, [user.id]);

  useEffect(() => { cargarAulas(); }, [cargarAulas]);

  const crearAula = async ({ nombre, materia }) => {
    await supabase.from("aulas").insert({ docente_id: user.id, nombre, materia });
    cargarAulas();
  };

  const actualizarAula = (aulaActualizada) => {
    setAulas(prev => prev.map(a => a.id === aulaActualizada.id ? aulaActualizada : a));
  };

  if (loading) return <div className="main"><div className="empty-state"><IconLoader /> Cargando aulas...</div></div>;

  return (
    <div className="main">
      {modalNueva && <NuevaAulaModal onClose={() => setModalNueva(false)} onCrear={crearAula} />}
      {aulaEditar && <EditarAulaModal aula={aulaEditar} onClose={() => setAulaEditar(null)} onGuardar={actualizarAula} />}
      <div className="page-header">
        <h1>Mis Aulas</h1>
        <p>Seleccioná un aula para registrar asistencia o notas</p>
      </div>
      <div className="aulas-grid">
        {aulas.map(a => (
          <div className="aula-card" key={a.id} onClick={() => onSelect(a)}>
            <div className="aula-tag" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>{a.materia}</span>
              <button className="edit-aula-btn" onClick={e => { e.stopPropagation(); setAulaEditar(a); }}>
                <IconEdit size={12} /> Editar
              </button>
            </div>
            <div className="aula-name">{a.nombre}</div>
            <div className="aula-meta">{a.total_alumnos || 0} alumnos</div>
            <div className="aula-chevron"><IconChevron /></div>
          </div>
        ))}
        <div className="add-aula-card" onClick={() => setModalNueva(true)}>
          <IconPlus size={28} />
          <span className="add-aula-text">Nueva aula</span>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL GESTIÓN ALUMNOS ────────────────────────────────────────────────────
function GestionAlumnosModal({ aula, user, onClose, onGuardar }) {
  const [tab, setTab] = useState("csv");
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState([]);
  const [parseMsg, setParseMsg] = useState(null);
  const [nombreManual, setNombreManual] = useState("");
  const [listaManual, setListaManual] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tab === "manual") {
      supabase.from("alumnos").select("nombre").eq("aula_id", aula.id).order("nombre")
        .then(({ data }) => setListaManual((data || []).map(a => a.nombre)));
    }
  }, [tab, aula.id]);

  const parsearCSV = (texto) => {
    const lineas = texto.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const encabezados = ["nombre", "apellido", "alumno", "name", "student"];
    const inicio = encabezados.some(e => lineas[0]?.toLowerCase().includes(e)) ? 1 : 0;
    return lineas.slice(inicio).map(l => {
      const cols = l.split(/[,;\t]/).map(c => c.trim()).filter(Boolean);
      if (cols.length >= 2) return `${cols[0]}, ${cols[1]}`;
      return cols[0];
    }).filter(n => n.length > 2);
  };

  const procesarArchivo = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const nombres = parsearCSV(e.target.result);
      if (nombres.length === 0) {
        setParseMsg({ tipo: "err", texto: "No se encontraron nombres válidos. Revisá el formato." });
      } else {
        setPreview(nombres);
        setParseMsg({ tipo: "ok", texto: `Se detectaron ${nombres.length} alumnos. Revisá y confirmá.` });
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  const descargarPlantilla = () => {
    const blob = new Blob(["Apellido,Nombre\nGarcía,Juan\nLópez,María"], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `plantilla_alumnos_${aula.nombre.replace(/\s/g, "_")}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const confirmar = async () => {
    const lista = tab === "csv" ? preview : listaManual;
    if (lista.length === 0) return;
    setLoading(true);
    const docenteId = aula.docente_id || user.id;
    await supabase.from("alumnos").delete().eq("aula_id", aula.id);
    await supabase.from("alumnos").insert(lista.map(nombre => ({ docente_id: docenteId, aula_id: aula.id, nombre })));
    await supabase.from("aulas").update({ total_alumnos: lista.length }).eq("id", aula.id);
    setLoading(false);
    onGuardar(lista);
    onClose();
  };

  const listaActiva = tab === "csv" ? preview : listaManual;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Alumnos — {aula.nombre}</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-tabs">
            <button className={`modal-tab ${tab === "csv" ? "active" : ""}`} onClick={() => setTab("csv")}>📄 Importar CSV</button>
            <button className={`modal-tab ${tab === "manual" ? "active" : ""}`} onClick={() => setTab("manual")}>✏️ Carga manual</button>
          </div>
          {tab === "csv" && (
            <>
              <label className={`dropzone ${drag ? "drag" : ""}`}
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); procesarArchivo(e.dataTransfer.files[0]); }}>
                <input type="file" accept=".csv,.txt" onChange={e => procesarArchivo(e.target.files[0])} />
                <div className="dropzone-icon"><IconUpload size={32} /></div>
                <div className="dropzone-title">Arrastrá tu archivo o hacé clic para seleccionar</div>
                <div className="dropzone-sub">Formatos: CSV, TXT</div>
              </label>
              <div className="template-link" onClick={descargarPlantilla}>⬇ Descargar plantilla CSV</div>
              {parseMsg && <div className={parseMsg.tipo === "ok" ? "parse-ok" : "parse-error"}>{parseMsg.texto}</div>}
              <div className="preview-list">
                {preview.map((n, i) => (
                  <div className="preview-item" key={i}>
                    <span className="preview-num">{i + 1}</span>
                    <span className="preview-name">{n}</span>
                    <button className="preview-del" onClick={() => setPreview(p => p.filter((_, idx) => idx !== i))}><IconTrash /></button>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab === "manual" && (
            <>
              <div className="manual-input-row">
                <input className="manual-input" type="text" placeholder="Apellido, Nombre" value={nombreManual}
                  onChange={e => setNombreManual(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && nombreManual.trim()) { setListaManual(l => [...l, nombreManual.trim()]); setNombreManual(""); } }} />
                <button className="btn-add" onClick={() => { if (nombreManual.trim()) { setListaManual(l => [...l, nombreManual.trim()]); setNombreManual(""); } }}>
                  <IconPlus size={16} /> Agregar
                </button>
              </div>
              <div className="preview-list">
                {listaManual.length === 0 && <div style={{ textAlign: "center", padding: "24px", color: "var(--ink3)", fontSize: 13 }}>Escribí un nombre y presioná Agregar.</div>}
                {listaManual.map((n, i) => (
                  <div className="preview-item" key={i}>
                    <span className="preview-num">{i + 1}</span>
                    <span className="preview-name">{n}</span>
                    <button className="preview-del" onClick={() => setListaManual(l => l.filter((_, idx) => idx !== i))}><IconTrash /></button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-save" onClick={confirmar} disabled={listaActiva.length === 0 || loading}
            style={{ opacity: listaActiva.length > 0 ? 1 : .4 }}>
            {loading ? "Guardando..." : `Guardar (${listaActiva.length} alumnos)`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PLANILLA ────────────────────────────────────────────────────────────────
function Planilla({ aula, user, onBack }) {
  const [filas, setFilas] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [obs, setObs] = useState({});

  useEffect(() => {
    const cargar = async () => {
      const { data: alumnosData } = await supabase.from("alumnos").select("nombre").eq("aula_id", aula.id).order("nombre");
      const { data: asistData } = await supabase.from("asistencia").select("alumno_nombre,presente").eq("aula_id", aula.id).eq("docente_id", user.id);
      const { data: notasData } = await supabase.from("notas").select("*").eq("aula_id", aula.id).eq("docente_id", user.id);
      const alumnos = (alumnosData || []).map(a => a.nombre);
      const todasEtiquetas = [...new Set((notasData || []).map(n => n.etiqueta))].sort();
      setEtiquetas(todasEtiquetas);
      setFilas(alumnos.map(nombre => {
        const notasAlumno = (notasData || []).filter(n => n.alumno_nombre === nombre);
        const notasPorEtiqueta = {};
        todasEtiquetas.forEach(et => {
          const ns = notasAlumno.filter(n => n.etiqueta === et);
          notasPorEtiqueta[et] = ns.length > 0 ? Math.round((ns.reduce((s, n) => s + parseFloat(n.nota), 0) / ns.length) * 10) / 10 : null;
        });
        const todasNotas = notasAlumno.map(n => parseFloat(n.nota));
        const promedio = todasNotas.length > 0 ? Math.round((todasNotas.reduce((s, n) => s + n, 0) / todasNotas.length) * 10) / 10 : null;
        const asistAlumno = (asistData || []).filter(r => r.alumno_nombre === nombre);
        const totalDias = asistAlumno.length;
        const presentes = asistAlumno.filter(d => d.presente).length;
        const pctAsist = totalDias > 0 ? Math.round((presentes / totalDias) * 100) : null;
        return { nombre, notasPorEtiqueta, promedio, pctAsist, totalDias, presentes };
      }));
      setLoading(false);
    };
    cargar();
  }, [aula.id, user.id]);

  const colorClase = (n) => n === null ? "" : n >= 8 ? "alta" : n >= 6 ? "media" : "baja";

  const exportarExcel = () => {
    const encabezados = ["Alumno", ...etiquetas, "Promedio", "Asistencia", "Observaciones"];
    const rows = filas.map(f => [
      f.nombre,
      ...etiquetas.map(et => f.notasPorEtiqueta[et] ?? ""),
      f.promedio ?? "",
      f.pctAsist !== null ? `${f.pctAsist}% (${f.presentes}/${f.totalDias})` : "Sin datos",
      obs[f.nombre] || ""
    ]);
    const csvContent = [encabezados, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `planilla_${aula.nombre.replace(/\s/g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="main"><div className="empty-state"><IconLoader /> Cargando planilla...</div></div>;

  return (
    <div className="main" style={{ maxWidth: "100%" }}>
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBack}>Mis Aulas</span>
        <IconChevron /><span>{aula.nombre}</span><IconChevron /><span>Planilla</span>
      </div>
      <div className="page-header"><h1>Planilla del Curso</h1><p>{aula.nombre} · {aula.materia}</p></div>
      <div className="planilla-actions">
        <button className="btn-excel" onClick={exportarExcel}>
          <IconDownload size={16} /> Exportar a Excel (.csv)
        </button>
        <span style={{ fontSize: 13, color: "var(--ink3)" }}>Podés editar las observaciones directamente en la tabla</span>
      </div>
      {filas.length === 0
        ? <div className="empty-state">No hay alumnos cargados en esta aula.</div>
        : <div className="planilla-wrap">
            <table className="planilla-table">
              <thead>
                <tr>
                  <th>Alumno</th>
                  {etiquetas.map(et => <th key={et}>{et}</th>)}
                  <th>Promedio</th>
                  <th>Asistencia</th>
                  <th style={{ minWidth: 160 }}>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {filas.map(f => (
                  <tr key={f.nombre}>
                    <td style={{ fontWeight: 500, whiteSpace: "nowrap" }}>{f.nombre}</td>
                    {etiquetas.map(et => (
                      <td key={et} className={`num ${colorClase(f.notasPorEtiqueta[et])}`}>
                        {f.notasPorEtiqueta[et] ?? <span style={{ color: "var(--ink3)" }}>—</span>}
                      </td>
                    ))}
                    <td className={`num ${colorClase(f.promedio)}`} style={{ fontWeight: 700 }}>
                      {f.promedio ?? <span style={{ color: "var(--ink3)" }}>—</span>}
                    </td>
                    <td className="asist-cell">
                      {f.pctAsist !== null
                        ? <span style={{ fontWeight: 600, color: f.pctAsist >= 75 ? "var(--accent)" : "var(--warn)" }}>{f.pctAsist}%</span>
                        : <span style={{ color: "var(--ink3)" }}>—</span>}
                    </td>
                    <td>
                      <input
                        className="obs-input"
                        type="text"
                        placeholder="Agregar observación..."
                        value={obs[f.nombre] || ""}
                        onChange={e => setObs(prev => ({ ...prev, [f.nombre]: e.target.value }))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div>
  );
}

// ─── AULA VIEW ────────────────────────────────────────────────────────────────
function AulaView({ aula, user, onBack, onAction }) {
  const [alumnos, setAlumnos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [asistCount, setAsistCount] = useState(0);
  const [notasCount, setNotasCount] = useState(0);

  useEffect(() => {
    supabase.from("alumnos").select("nombre").eq("aula_id", aula.id).then(({ data }) => setAlumnos((data || []).map(a => a.nombre)));
    supabase.from("asistencia").select("id", { count: "exact" }).eq("aula_id", aula.id).eq("docente_id", user.id).then(({ count }) => setAsistCount(count || 0));
    supabase.from("notas").select("id", { count: "exact" }).eq("aula_id", aula.id).eq("docente_id", user.id).then(({ count }) => setNotasCount(count || 0));
  }, [aula.id, user.id]);

  return (
    <div className="main">
      {modalOpen && <GestionAlumnosModal aula={aula} user={user} onClose={() => setModalOpen(false)} onGuardar={lista => setAlumnos(lista)} />}
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBack}>Mis Aulas</span>
        <IconChevron /><span>{aula.nombre}</span>
      </div>
      <div className="page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1>{aula.nombre}</h1>
          <p>{aula.materia} · {alumnos.length} alumnos</p>
        </div>
        <button className="alumno-mgr-btn" onClick={() => setModalOpen(true)}>
          <IconUsers size={16} /> Gestionar alumnos
        </button>
      </div>

      {alumnos.length === 0 && (
        <div style={{ background: "var(--gold-light)", border: "1.5px solid #e9c46a55", borderRadius: 14, padding: "20px 24px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 28 }}>📋</span>
          <div>
            <div style={{ fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>Este aula no tiene alumnos cargados</div>
            <div style={{ fontSize: 13, color: "var(--ink3)" }}>Hacé clic en <strong>Gestionar alumnos</strong> para importar desde CSV o cargar manualmente.</div>
          </div>
        </div>
      )}

      <div className="aula-actions">
        <button className="action-btn asistencia" onClick={() => onAction("asistencia")}>
          <div className="action-btn-icon"><IconCalendar /></div>
          <div className="action-btn-title">Registrar Asistencia</div>
          <div className="action-btn-desc">Marcá presentes y ausentes con un toggle rápido.</div>
          <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 4 }}>{asistCount} registros</div>
        </button>
        <button className="action-btn notas" onClick={() => onAction("notas")}>
          <div className="action-btn-icon"><IconStar /></div>
          <div className="action-btn-title">Registrar Nota</div>
          <div className="action-btn-desc">Ingresá calificaciones por alumno y actividad.</div>
          <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 4 }}>{notasCount} notas cargadas</div>
        </button>
        <button className="action-btn"
          onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "var(--paper3)"}
          onClick={() => onAction("resumen")}>
          <div className="action-btn-icon" style={{ background: "#ede9fe", color: "#6d28d9" }}><IconUsers /></div>
          <div className="action-btn-title">Resumen del Curso</div>
          <div className="action-btn-desc">Vista consolidada por alumno: asistencia y notas.</div>
          <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 4 }}>{alumnos.length} alumnos</div>
        </button>
        <button className="action-btn"
          onMouseEnter={e => e.currentTarget.style.borderColor = "#217346"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "var(--paper3)"}
          onClick={() => onAction("planilla")}>
          <div className="action-btn-icon" style={{ background: "#e8f5e9", color: "#217346" }}><IconTable /></div>
          <div className="action-btn-title">Planilla</div>
          <div className="action-btn-desc">Tabla completa con notas, promedio y asistencia. Exportable a Excel.</div>
        </button>
      </div>
    </div>
  );
}

// ─── ASISTENCIA ───────────────────────────────────────────────────────────────
function Asistencia({ aula, user, onBack, onToast }) {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fecha, setFecha] = useState(today());

  const cargar = useCallback(async (f) => {
    setLoading(true);
    const { data: alumnosData } = await supabase.from("alumnos").select("nombre").eq("aula_id", aula.id).order("nombre");
    const nombres = (alumnosData || []).map(a => a.nombre);
    const { data: asistFecha } = await supabase.from("asistencia").select("alumno_nombre,presente,estado").eq("aula_id", aula.id).eq("docente_id", user.id).eq("fecha", f);
    const mapaFecha = {};
    (asistFecha || []).forEach(r => { mapaFecha[r.alumno_nombre] = r.estado || (r.presente ? "presente" : "ausente"); });
    setLista(nombres.map((n, i) => ({ id: i, nombre: n, estado: mapaFecha[n] || "presente" })));
    setLoading(false);
  }, [aula.id, user.id]);

  useEffect(() => { cargar(fecha); }, [cargar, fecha]);

  const setEstado = (id, estado) => setLista(l => l.map(a => a.id === id ? { ...a, estado } : a));

  const presentes = lista.filter(a => a.estado === "presente").length;
  const tardanzas = lista.filter(a => a.estado === "tardanza").length;
  const retiros = lista.filter(a => a.estado === "retiro").length;
  const ausentes = lista.filter(a => a.estado === "ausente").length;

  const guardar = async () => {
    setSaving(true);
    await supabase.from("asistencia").delete().eq("aula_id", aula.id).eq("docente_id", user.id).eq("fecha", fecha);
    await supabase.from("asistencia").insert(
      lista.map(a => ({
        docente_id: user.id,
        aula_id: aula.id,
        aula_nombre: aula.nombre,
        alumno_nombre: a.nombre,
        fecha: fecha,
        presente: a.estado === "presente" || a.estado === "tardanza",
        estado: a.estado
      }))
    );
    setSaving(false);
    onToast("✓ Asistencia guardada correctamente");
  };

  const estadoLabel = { presente: "Presente", tardanza: "Tardanza", retiro: "Retiro", ausente: "Ausente" };
  const estadoClass = { presente: "active-presente", tardanza: "active-tardanza", retiro: "active-retiro", ausente: "active-ausente" };

  if (loading) return <div className="main"><div className="empty-state"><IconLoader /> Cargando...</div></div>;

  return (
    <div className="main">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBack}>Mis Aulas</span>
        <IconChevron /><span>{aula.nombre}</span><IconChevron /><span>Asistencia</span>
      </div>
      <div className="page-header">
        <h1>Registrar Asistencia</h1>
        <p style={{ textTransform: "capitalize" }}>{fmtDate(fecha)}</p>
      </div>
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">{aula.nombre} · {aula.materia}</span>
          <span className="panel-date"><IconCalendar />{fecha}</span>
        </div>
        <div className="fecha-selector">
          <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)" }}>Fecha:</label>
          <input className="fecha-input" type="date" value={fecha} max={today()} onChange={e => setFecha(e.target.value)} />
          {fecha !== today() && <span style={{ fontSize: 12, color: "var(--gold)", fontWeight: 600 }}>📅 Editando fecha pasada</span>}
        </div>
        {lista.length === 0
          ? <div className="empty-state">No hay alumnos en esta aula. Cargalos primero desde "Gestionar alumnos".</div>
          : <>
            <div className="summary-bar">
              <span className="summary-chip green">✓ Presentes: {presentes}</span>
              {tardanzas > 0 && <span className="summary-chip" style={{ background: "#fef9e7", color: "#b7860b" }}>⏰ Tardanzas: {tardanzas}</span>}
              {retiros > 0 && <span className="summary-chip" style={{ background: "#f0f0ff", color: "#5c5cb8" }}>🚪 Retiros: {retiros}</span>}
              <span className="summary-chip red">✗ Ausentes: {ausentes}</span>
            </div>
            <div className="alumno-list">
              {lista.map((a, i) => (
                <div className="alumno-row" key={a.id} style={{ flexWrap: "wrap", gap: 6 }}>
                  <span className="alumno-num">{i + 1}</span>
                  <span className="alumno-name">{a.nombre}</span>
                  <div className="estado-btns">
                    {["presente", "tardanza", "retiro", "ausente"].map(est => (
                      <button
                        key={est}
                        className={`estado-btn ${a.estado === est ? estadoClass[est] : ""}`}
                        onClick={() => setEstado(a.id, est)}
                      >
                        {estadoLabel[est]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="save-row">
              <button className="btn-ghost" onClick={onBack}>Cancelar</button>
              <button className="btn-save" onClick={guardar} disabled={saving}>{saving ? "Guardando..." : "Guardar asistencia"}</button>
            </div>
          </>
        }
      </div>
    </div>
  );
}

// ─── NOTAS ────────────────────────────────────────────────────────────────────
function Notas({ aula, user, onBack, onToast }) {
  const [alumnos, setAlumnos] = useState([]);
  const [alumno, setAlumno] = useState("");
  const [nota, setNota] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [registros, setRegistros] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("alumnos").select("nombre").eq("aula_id", aula.id).order("nombre").then(({ data }) => setAlumnos((data || []).map(a => a.nombre)));
    supabase.from("notas").select("*").eq("aula_id", aula.id).eq("docente_id", user.id).order("timestamp", { ascending: false }).limit(20).then(({ data }) => setRegistros(data || []));
  }, [aula.id, user.id]);

  const notaNum = parseFloat(nota);
  const valida = alumno && nota && !isNaN(notaNum) && notaNum >= 0 && notaNum <= 10 && etiqueta;

  const guardar = async () => {
    if (!valida) return;
    setSaving(true);
    const { data } = await supabase.from("notas").insert({ docente_id: user.id, aula_id: aula.id, aula_nombre: aula.nombre, alumno_nombre: alumno, nota: notaNum, etiqueta, fecha: today() }).select();
    setSaving(false);
    setRegistros(r => [data[0], ...r]);
    setAlumno(""); setNota(""); setEtiqueta("");
    onToast(`✓ Nota ${notaNum} guardada para ${alumno}`);
  };

  return (
    <div className="main">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBack}>Mis Aulas</span>
        <IconChevron /><span>{aula.nombre}</span><IconChevron /><span>Notas</span>
      </div>
      <div className="page-header"><h1>Registrar Nota</h1><p>{aula.nombre} · {aula.materia}</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Nueva nota</span>
            <span className="panel-date"><IconPen />{today()}</span>
          </div>
          <div className="nota-form">
            <div>
              <div className="field"><label>Alumno</label></div>
              <select className="nota-select" value={alumno} onChange={e => setAlumno(e.target.value)}>
                <option value="">Seleccioná un alumno…</option>
                {alumnos.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="nota-row">
              <div>
                <div className="field"><label>Nota (0–10)</label></div>
                <input className="nota-input" type="number" min="0" max="10" step="0.1" placeholder="8.5" value={nota} onChange={e => setNota(e.target.value)} />
              </div>
              <div>
                <div className="field"><label>Etiqueta</label></div>
                <input className="nota-input" type="text" placeholder="ej: Examen parcial 1" value={etiqueta} onChange={e => setEtiqueta(e.target.value)} />
              </div>
            </div>
            {nota && !isNaN(notaNum) && (
              <div className="nota-preview">
                <div>
                  <div className="nota-preview-label">{alumno || "—"}</div>
                  <div className="nota-preview-sub">{etiqueta || "Sin etiqueta"}</div>
                </div>
                <div className="nota-preview-val">{notaNum}</div>
              </div>
            )}
            <div className="save-row">
              <button className="btn-ghost" onClick={onBack}>Cancelar</button>
              <button className="btn-save" onClick={guardar} disabled={!valida || saving}
                style={{ opacity: valida ? 1 : .4, background: "#b7860b" }}>
                {saving ? "Guardando..." : "Guardar nota"}
              </button>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="registros-title">Últimas notas</div>
          <div className="registro-list">
            {registros.length === 0
              ? <div className="empty-state">Sin notas registradas aún.</div>
              : registros.map(r => (
                <div className="registro-item" key={r.id}>
                  <span className="ri-date">{r.fecha}</span>
                  <span className="ri-name">{r.alumno_nombre}</span>
                  <span className="ri-val">{r.nota}</span>
                  <span className="ri-label">{r.etiqueta}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RESUMEN ──────────────────────────────────────────────────────────────────
function Resumen({ aula, user, onBack }) {
  const [datosAlumno, setDatosAlumno] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [expandido, setExpandido] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const { data: alumnosData } = await supabase.from("alumnos").select("nombre").eq("aula_id", aula.id).order("nombre");
      const { data: asistData } = await supabase.from("asistencia").select("alumno_nombre,fecha,presente").eq("aula_id", aula.id).eq("docente_id", user.id);
      const { data: notasData } = await supabase.from("notas").select("*").eq("aula_id", aula.id).eq("docente_id", user.id);
      const alumnos = (alumnosData || []).map(a => a.nombre);
      setDatosAlumno(alumnos.map(nombre => {
        const asistDias = (asistData || []).filter(r => r.alumno_nombre === nombre).map(r => ({ fecha: r.fecha, presente: r.presente }));
        const totalDias = asistDias.length;
        const diasPresente = asistDias.filter(d => d.presente).length;
        const pctAsist = totalDias > 0 ? Math.round((diasPresente / totalDias) * 100) : null;
        const notasAlumno = (notasData || []).filter(n => n.alumno_nombre === nombre);
        const promedio = notasAlumno.length > 0 ? Math.round((notasAlumno.reduce((s, n) => s + parseFloat(n.nota), 0) / notasAlumno.length) * 10) / 10 : null;
        return { nombre, asistDias, totalDias, diasPresente, pctAsist, notasAlumno, promedio };
      }));
      setLoading(false);
    };
    cargar();
  }, [aula.id, user.id]);

  const colorNota = (n) => n >= 8 ? "alta" : n >= 6 ? "media" : "baja";
  const colorBar = (n) => n >= 8 ? "var(--accent)" : n >= 6 ? "var(--gold)" : "var(--warn)";
  const initials = (nombre) => nombre.split(",")[0].trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const conNotas = datosAlumno.filter(a => a.promedio !== null);
  const promedioGlobal = conNotas.length > 0 ? Math.round((conNotas.reduce((s, a) => s + a.promedio, 0) / conNotas.length) * 10) / 10 : null;
  const enRiesgo = datosAlumno.filter(a => (a.pctAsist !== null && a.pctAsist < 75) || (a.promedio !== null && a.promedio < 6)).length;
  const destacados = datosAlumno.filter(a => a.promedio !== null && a.promedio >= 8).length;

  const filtrados = datosAlumno
    .filter(a => a.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .filter(a => {
      if (filtro === "riesgo") return (a.pctAsist !== null && a.pctAsist < 75) || (a.promedio !== null && a.promedio < 6);
      if (filtro === "destacados") return a.promedio !== null && a.promedio >= 8;
      return true;
    });

  const avatarColors = [["#e8f4f8", "#2d6a4f"], ["#fef9e7", "#b7860b"], ["#fde8ea", "#e63946"], ["#f0f0ff", "#5c5cb8"], ["#f0faf4", "#2d6a4f"]];

  if (loading) return <div className="main"><div className="empty-state"><IconLoader /> Cargando resumen...</div></div>;

  return (
    <div className="main">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBack}>Mis Aulas</span>
        <IconChevron /><span>{aula.nombre}</span><IconChevron /><span>Resumen</span>
      </div>
      <div className="page-header"><h1>Resumen del Curso</h1><p>{aula.nombre} · {aula.materia}</p></div>
      <div className="resumen-stats-top">
        {[["Alumnos", datosAlumno.length, ""], ["Promedio global", promedioGlobal ?? "—", promedioGlobal ? colorNota(promedioGlobal) : ""], ["En riesgo", enRiesgo, enRiesgo > 0 ? "red" : ""], ["Destacados", destacados, destacados > 0 ? "gold" : ""]].map(([l, v, c]) => (
          <div className="rst" key={l}><div className="rst-lbl">{l}</div><div className={`rst-val ${c}`}>{v}</div></div>
        ))}
      </div>
      <input className="resumen-search" type="text" placeholder="Buscar alumno…" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      <div className="resumen-tabs">
        {[["todos", "Todos"], ["riesgo", `En riesgo (${enRiesgo})`], ["destacados", `Destacados (${destacados})`]].map(([v, l]) => (
          <button key={v} className={`rtab ${filtro === v ? "active" : ""}`} onClick={() => setFiltro(v)}>{l}</button>
        ))}
      </div>
      <div className="resumen-grid">
        {filtrados.length === 0 && <div className="empty-state">No se encontraron alumnos.</div>}
        {filtrados.map((a, i) => {
          const [bg, fg] = avatarColors[i % avatarColors.length];
          const abierto = expandido === a.nombre;
          return (
            <div className="alumno-card" key={a.nombre}>
              <div className="alumno-card-header" onClick={() => setExpandido(abierto ? null : a.nombre)}>
                <div className="alumno-avatar" style={{ background: bg, color: fg }}>{initials(a.nombre)}</div>
                <div style={{ flex: 1 }}>
                  <div className="alumno-card-name">{a.nombre}</div>
                  {((a.pctAsist !== null && a.pctAsist < 75) || (a.promedio !== null && a.promedio < 6)) && <div style={{ fontSize: 11, color: "var(--warn)", marginTop: 2 }}>⚠ Requiere atención</div>}
                </div>
                <div className="alumno-card-stats">
                  {[["Asist.", a.pctAsist !== null ? `${a.pctAsist}%` : "—", a.pctAsist !== null ? (a.pctAsist >= 75 ? "green" : "red") : ""], ["Prom.", a.promedio ?? "—", a.promedio !== null ? colorNota(a.promedio) : ""], ["Notas", a.notasAlumno.length, ""]].map(([lbl, val, cls], idx, arr) => (
                    <><div className="astat" key={lbl}><span className={`astat-val ${cls}`}>{val}</span><span className="astat-lbl">{lbl}</span></div>{idx < arr.length - 1 && <div className="astat-sep" />}</>
                  ))}
                </div>
                <div className={`alumno-card-expand ${abierto ? "open" : ""}`}><IconChevron /></div>
              </div>
              {abierto && (
                <div className="alumno-card-body">
                  <div className="alumno-body-grid">
                    <div>
                      <div className="alumno-section-title">Asistencia — {a.diasPresente}/{a.totalDias} días</div>
                      {a.totalDias === 0 ? <div style={{ fontSize: 13, color: "var(--ink3)" }}>Sin registros aún</div> : (
                        <>
                          <div className="asist-calendar">
                            {a.asistDias.map((d, idx) => <div key={idx} className={`asist-dot ${d.presente ? "p" : "a"}`} title={`${d.fecha}`}>{d.presente ? "P" : "A"}</div>)}
                          </div>
                          <div className="promedio-bar" style={{ marginTop: 10 }}>
                            <div className="bar-track"><div className="bar-fill" style={{ width: `${a.pctAsist}%`, background: a.pctAsist >= 75 ? "var(--accent)" : "var(--warn)" }} /></div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: a.pctAsist >= 75 ? "var(--accent)" : "var(--warn)" }}>{a.pctAsist}%</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <div className="alumno-section-title">Notas — {a.notasAlumno.length} registradas</div>
                      {a.notasAlumno.length === 0 ? <div style={{ fontSize: 13, color: "var(--ink3)" }}>Sin notas aún</div> : (
                        <>
                          {a.notasAlumno.map(n => <div className="nota-pill" key={n.id}><span className="nota-pill-label">{n.etiqueta}</span><span className={`nota-pill-val ${colorNota(n.nota)}`}>{n.nota}</span></div>)}
                          {a.notasAlumno.length > 1 && <div className="promedio-bar" style={{ marginTop: 6 }}><span style={{ fontSize: 12, color: "var(--ink3)" }}>Promedio</span><div className="bar-track"><div className="bar-fill" style={{ width: `${(a.promedio / 10) * 100}%`, background: colorBar(a.promedio) }} /></div><span style={{ fontSize: 12, fontWeight: 700, color: colorBar(a.promedio) }}>{a.promedio}</span></div>}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CONFIG ───────────────────────────────────────────────────────────────────
function Config({ user, onBack }) {
  const nombre = user.user_metadata?.nombre_completo || user.email;
  const [cambiandoPass, setCambiandoPass] = useState(false);
  const [passMsg, setPassMsg] = useState("");
  const [passErr, setPassErr] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarCambioPass = async () => {
    setLoading(true); setPassErr(""); setPassMsg("");
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: window.location.origin
    });
    setLoading(false);
    if (error) { setPassErr("No se pudo enviar el correo. Intentá de nuevo."); return; }
    setPassMsg("Te enviamos un correo con el link para cambiar tu contraseña.");
    setCambiandoPass(false);
  };

  return (
    <div className="main">
      <div className="breadcrumb"><span className="breadcrumb-link" onClick={onBack}>Mis Aulas</span><IconChevron /><span>Mi cuenta</span></div>
      <div className="page-header"><h1>Mi cuenta</h1><p>Configuración y datos personales</p></div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-header"><span className="panel-title">Datos de la cuenta</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
              {nombre.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>{nombre}</div>
              <div style={{ fontSize: 13, color: "var(--ink3)" }}>{user.email}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-header"><span className="panel-title">Contraseña</span></div>
        {passMsg && <div className="login-ok" style={{ marginBottom: 14 }}>{passMsg}</div>}
        {passErr && <div className="login-error" style={{ marginBottom: 14 }}>{passErr}</div>}
        {!cambiandoPass
          ? <button className="btn-ghost" onClick={() => setCambiandoPass(true)}>Cambiar contraseña</button>
          : <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontSize: 13, color: "var(--ink3)" }}>Te enviaremos un correo a <strong>{user.email}</strong> con un link para cambiar tu contraseña.</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-save" onClick={enviarCambioPass} disabled={loading}>{loading ? "Enviando..." : "Enviar correo"}</button>
                <button className="btn-ghost" onClick={() => setCambiandoPass(false)}>Cancelar</button>
              </div>
            </div>
        }
      </div>

      <div className="panel">
        <div className="panel-header"><span className="panel-title">Información</span></div>
        <div style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 2 }}>
          <div>Versión <strong>1.0.0</strong></div>
          <div>Desarrollado con ❤️ para docentes</div>
        </div>
      </div>
    </div>
  );
}


// ─── ADMIN ────────────────────────────────────────────────────────────────────
const ADMIN_ID = "088cf6c0-7e53-4999-ae1f-7f0c9222edbf";

function Admin({ user, onBack }) {
  const [perfiles, setPerfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aulasPorUser, setAulasPorUser] = useState({});
  const [expandido, setExpandido] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [aulaGestion, setAulaGestion] = useState(null);

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 2500); };

  const cargar = useCallback(async () => {
    const { data: perfilesData } = await supabase.from("perfiles").select("*").order("created_at");
    setPerfiles(perfilesData || []);
    const { data: aulasData } = await supabase.from("aulas").select("*").order("created_at");
    const mapa = {};
    (aulasData || []).forEach(a => {
      if (!mapa[a.docente_id]) mapa[a.docente_id] = [];
      mapa[a.docente_id].push(a);
    });
    setAulasPorUser(mapa);
    setLoading(false);
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  const toggleActivo = async (perfil) => {
    const nuevoEstado = !perfil.activo;
    await supabase.from("perfiles").update({ activo: nuevoEstado }).eq("id", perfil.id);
    setPerfiles(prev => prev.map(p => p.id === perfil.id ? { ...p, activo: nuevoEstado } : p));
    showToast(nuevoEstado ? "Cuenta habilitada" : "Cuenta deshabilitada");
  };

  const docentes = perfiles.filter(p => p.id !== ADMIN_ID);
  const totalActivos = docentes.filter(p => p.activo).length;
  const totalAulas = Object.values(aulasPorUser).flat().length;

  if (loading) return <div className="main"><div className="empty-state"><IconLoader /> Cargando panel...</div></div>;

  return (
    <div className="main">
      {toastMsg && <div className="toast">{toastMsg}</div>}
      <div className="admin-header">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Panel de Administración</h1>
          <p>Gestioná las cuentas de las docentes</p>
        </div>
        <button className="admin-nav-btn" onClick={onBack}>← Volver</button>
      </div>
      <div className="admin-stats">
        {[
          ["Docentes", docentes.length, "var(--ink)"],
          ["Activas", totalActivos, "var(--accent)"],
          ["Inactivas", docentes.length - totalActivos, docentes.length - totalActivos > 0 ? "var(--warn)" : "var(--ink)"],
          ["Aulas totales", totalAulas, "var(--ink)"]
        ].map(([l, v, c]) => (
          <div className="admin-stat" key={l}>
            <div className="admin-stat-lbl">{l}</div>
            <div className="admin-stat-val" style={{ color: c }}>{v}</div>
          </div>
        ))}
      </div>
      <div className="user-list">
        {docentes.length === 0 && <div className="empty-state">No hay docentes registradas todavía.</div>}
        {docentes.map(p => {
          const aulas = aulasPorUser[p.id] || [];
          const abierto = expandido === p.id;
          const iniciales = (p.nombre || p.email || "?").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
          return (
            <div className={`user-card ${p.activo ? "" : "inactivo"}`} key={p.id} style={{ flexDirection: "column", alignItems: "stretch" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div className={`user-avatar-admin ${p.activo ? "" : "inactivo"}`}>{iniciales}</div>
                <div className="user-info" onClick={() => setExpandido(abierto ? null : p.id)}>
                  <div className="user-name">
                    {p.nombre || "Sin nombre"}
                    <span className={`user-badge ${p.activo ? "activo" : "inactivo"}`}>{p.activo ? "Activa" : "Inactiva"}</span>
                  </div>
                  <div className="user-email">{p.email}</div>
                  <div className="user-meta">{aulas.length} aula{aulas.length !== 1 ? "s" : ""} · Desde {new Date(p.created_at).toLocaleDateString("es-AR")}</div>
                </div>
                <div className="toggle-activo">
                  <span className="toggle-activo-label">{p.activo ? "Habilitada" : "Bloqueada"}</span>
                  <label className="toggle">
                    <input type="checkbox" checked={p.activo} onChange={() => toggleActivo(p)} />
                    <span className="toggle-track" />
                    <span className="toggle-thumb" />
                  </label>
                </div>
              </div>
              {abierto && (
                <div className="user-aulas">
                  {aulas.length === 0
                    ? <div style={{ fontSize: 13, color: "var(--ink3)", paddingTop: 8 }}>Sin aulas creadas aún.</div>
                    : aulas.map(a => (
                      <div key={a.id} style={{ background: "var(--paper)", borderRadius: 10, padding: "10px 14px", marginTop: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                          <div>
                            <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: 14 }}>📚 {a.nombre}</span>
                            <span style={{ color: "var(--ink3)", fontSize: 13 }}> — {a.materia}</span>
                            <span style={{ color: "var(--ink3)", fontSize: 12, marginLeft: 8 }}>({a.total_alumnos || 0} alumnos)</span>
                          </div>
                          <button
                            className="alumno-mgr-btn"
                            onClick={() => setAulaGestion({ ...a, docente_nombre: p.nombre || p.email })}
                          >
                            <IconUsers size={14} /> Gestionar alumnos
                          </button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>
      {aulaGestion && (
        <GestionAlumnosModal
          aula={aulaGestion}
          user={user}
          onClose={() => setAulaGestion(null)}
          onGuardar={() => { cargar(); setAulaGestion(null); }}
        />
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [bloqueado, setBloqueado] = useState(false);
  const [screen, setScreen] = useState("dashboard");
  const [aulaActual, setAulaActual] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2800); };
  const logout = async () => { await supabase.auth.signOut(); setScreen("dashboard"); setAulaActual(null); setBloqueado(false); };
  const isAdmin = user?.id === "088cf6c0-7e53-4999-ae1f-7f0c9222edbf";

  if (loadingAuth) return (
    <>
      <style>{styles}</style>
      <div className="loading-screen"><IconLoader /> Cargando...</div>
    </>
  );

  if (!user) return (
    <>
      <style>{styles}</style>
      <Login onLogin={setUser} />
    </>
  );

  if (bloqueado) return (
    <>
      <style>{styles}</style>
      <div className="login-wrap">
        <div className="login-bg" />
        <div className="login-card" style={{ maxWidth: 480 }}>
          <div className="login-logo" style={{ justifyContent: "center" }}>
            <div className="login-logo-mark">A</div>
            <span className="login-logo-text">Aula</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", marginBottom: 6, textAlign: "center" }}>¡Ya casi estás!</h2>
          <p style={{ color: "var(--ink3)", fontSize: 14, marginBottom: 24, textAlign: "center" }}>Tu cuenta está lista. Solo falta completar el pago para activarla.</p>

          <div style={{ background: "var(--accent-light)", border: "1.5px solid var(--accent)", borderRadius: 12, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--accent)", marginBottom: 8 }}>Paso 1 — Realizá el pago</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "var(--ink2)" }}>Alias Mercado Pago</span>
              <span style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>aula.app</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--ink2)" }}>Monto mensual</span>
              <span style={{ fontWeight: 700, fontSize: 18, color: "var(--accent)" }}>$ 2000</span>
            </div>
          </div>

          <div style={{ background: "var(--gold-light)", border: "1.5px solid #e9c46a55", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "#b7860b", marginBottom: 8 }}>Paso 2 — Enviá el comprobante</div>
            <p style={{ fontSize: 13, color: "var(--ink2)", marginBottom: 12 }}>Mandanos una captura del pago por WhatsApp y te activamos en minutos.</p>
            <a
              href={"https://wa.me/543772501736?text=" + encodeURIComponent("Hola! Acabo de registrarme en Aula y quiero activar mi cuenta. Te mando el comprobante del pago de $2000.")}
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", borderRadius: 10, padding: "12px 20px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
            >
              <span style={{ fontSize: 18 }}>💬</span> Enviar comprobante por WhatsApp
            </a>
          </div>

          <button className="btn-ghost" style={{ width: "100%" }} onClick={logout}>Cerrar sesión</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <Topbar user={user} onLogout={logout} onConfig={() => setScreen("config")} onAdmin={isAdmin ? () => setScreen("admin") : null} />
        {screen === "dashboard" && <Dashboard user={user} onSelect={a => { setAulaActual(a); setScreen("aula"); }} />}
        {screen === "aula" && aulaActual && <AulaView aula={aulaActual} user={user} onBack={() => setScreen("dashboard")} onAction={s => setScreen(s)} />}
        {screen === "asistencia" && aulaActual && <Asistencia aula={aulaActual} user={user} onBack={() => setScreen("aula")} onToast={showToast} />}
        {screen === "notas" && aulaActual && <Notas aula={aulaActual} user={user} onBack={() => setScreen("aula")} onToast={showToast} />}
        {screen === "resumen" && aulaActual && <Resumen aula={aulaActual} user={user} onBack={() => setScreen("aula")} />}
        {screen === "planilla" && aulaActual && <Planilla aula={aulaActual} user={user} onBack={() => setScreen("aula")} />}
        {screen === "config" && <Config user={user} onBack={() => setScreen("dashboard")} />}
        {screen === "admin" && isAdmin && <Admin user={user} onBack={() => setScreen("dashboard")} />}
        <Toast msg={toast} />
      </div>
    </>
  );
}
