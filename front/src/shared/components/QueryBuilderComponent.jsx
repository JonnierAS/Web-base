import React, { useMemo, useState, useEffect } from "react";
import { QueryBuilder, formatQuery } from "react-querybuilder";
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import * as ReactDndTouchBackend from 'react-dnd-touch-backend';
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import "react-querybuilder/dist/query-builder.css";

// Campos de ejemplo 
const fieldsExample = [
  { name: "name", label: "Nombre", valueEditorType: "text" },
  { name: "age", label: "Edad", valueEditorType: "number" },
  {
    name: "status",
    label: "Estado",
    valueEditorType: "select",
    values: [
      { name: "Activo", value: "active" },
      { name: "Inactivo", value: "inactive" },
      { name: "Pendiente", value: "pending" },
    ],
  },
  { name: "city", label: "Ciudad", valueEditorType: "text" },
  { name: "createdAt", label: "Creado", valueEditorType: "date" },
  { name: "revenue", label: "Ingresos", valueEditorType: "number" },
];

// Operadores traducidos (opcional si quieres forzar etiquetas)
const defaultOperators = [
  { name: "=", label: "=" },
  { name: "!=", label: "≠" },
  { name: "<", label: "<" },
  { name: ">", label: ">" },
  { name: "<=", label: "≤" },
  { name: ">=", label: "≥" },
  { name: "contains", label: "contiene" },
  { name: "beginsWith", label: "comienza con" },
  { name: "endsWith", label: "termina con" },
  { name: "doesNotContain", label: "no contiene" },
  { name: "doesNotBeginWith", label: "no comienza con" },
  { name: "doesNotEndWith", label: "no termina con" },
  { name: "between", label: "entre" },
  { name: "notBetween", label: "no está entre" },
];

const initialQuery = { combinator: 'and', rules: [] };
// -----------------------------------------------------------------------------
// Controles personalizados: inputs nativos + clases Tailwind
// -----------------------------------------------------------------------------
const TWButton = ({ className = "", children, variant = "primary", size = "md", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  const sizes = size === "sm" ? "h-8 px-2 text-xs" : "h-10 px-4 text-sm";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400",
    ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };
  return (
    <button className={`${base} ${sizes} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const TWInput = ({ className = "", ...props }) => (
  <input
    className={`h-8 w-full rounded-md border border-gray-400/70  bg-white px-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);


const TWSelect = ({ className = "", children, ...props }) => (
  <select
    className={`h-8 w-full rounded-md border  border-gray-400/70 bg-white px-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
  </select>
);

// Renderizadores personalizados compatibles con react-querybuilder
const ValueEditor = ({ value, handleOnChange, type, values, disabled, title, className }) => {
  if (type === "select" && values) {
    return (
      <TWSelect disabled={disabled} value={String(value ?? "")} onChange={(e) => handleOnChange(e.target.value)}>
        <option value="" hidden>{title ?? "Seleccione"}</option>
        {values.map((v) => (
          <option key={String(v.value)} value={String(v.value)}>{v.name ?? String(v.value)}</option>
        ))}
      </TWSelect>
    );
  }
  if (type === "checkbox") {
    return (
      <label className="inline-flex items-center gap-2 text-xs">
        <input type="checkbox" className="h-4 w-4" checked={!!value} onChange={(e) => handleOnChange(e.target.checked)} disabled={disabled} />
        <span>{title ?? "Sí/No"}</span>
      </label>
    );
  }
  const inputType = type === "number" ? "number" : type === "date" ? "date" : "text";
  return (
    <TWInput type={inputType} value={value ?? ""} onChange={(e) => handleOnChange(e.target.value)} placeholder={title ?? "Valor"} disabled={disabled} className={className} />
  );
};

const FieldSelector = ({ options, className, handleOnChange, value, disabled }) => (
  <TWSelect className={className} value={value ?? ""} onChange={(e) => handleOnChange(e.target.value)} disabled={disabled}>
    <option value="" hidden>Campo</option>
    {(options ?? []).map((o) => (
      <option key={String(o.name)} value={String(o.name)}>{o.label ?? String(o.name)}</option>
    ))}
  </TWSelect>
);

const OperatorSelector = ({ options, className, handleOnChange, value, disabled }) => (
  <TWSelect className={className} value={value ?? ""} onChange={(e) => handleOnChange(e.target.value)} disabled={disabled}>
    <option value="" hidden>Operador</option>
    {(options ?? []).map((o) => (
      <option key={String(o.name)} value={String(o.name)}>{o.label ?? String(o.name)}</option>
    ))}
  </TWSelect>
);

const CombinatorSelector = ({ options, className, handleOnChange, value, disabled }) => (
  <TWSelect className={className} value={value ?? ""} onChange={(e) => handleOnChange(e.target.value)} disabled={disabled}>
    <option value="" hidden>Combinador</option>
    {(options ?? []).map((o) => (
      <option key={String(o.name)} value={String(o.name)}>{o.label ?? String(o.name)}</option>
    ))}
  </TWSelect>
);

const AddRuleAction = ({ handleOnClick, disabled }) => (
  <TWButton variant="secondary" size="sm" onClick={() => handleOnClick()} disabled={disabled}>➕ Regla</TWButton>
);

const AddGroupAction = ({ handleOnClick, disabled }) => (
  <TWButton variant="secondary" size="sm" onClick={() => handleOnClick()} disabled={disabled}>🧩 Grupo</TWButton>
);

const RemoveRuleAction = ({ handleOnClick, disabled }) => (
  <TWButton variant="ghost" size="sm" className="text-red-600" onClick={() => handleOnClick()} disabled={disabled}>🗑️</TWButton>
);

const RemoveGroupAction = ({ handleOnClick, disabled }) => (
  <TWButton variant="ghost" size="sm" className="text-red-600" onClick={() => handleOnClick()} disabled={disabled}>🗑️</TWButton>
);

// Presets de ejemplo (rápidos)
const presets = [
  {
    label: "Clientes activos en Lima",
    query: { combinator: "and", rules: [ { field: "status", operator: "=", value: "active" }, { field: "city", operator: "contains", value: "Lima" } ] },
  },
  {
    label: "Ingresos > 10k o edad < 25",
    query: { combinator: "or", rules: [ { field: "revenue", operator: ">", value: 10000 }, { field: "age", operator: "<", value: 25 } ] },
  },
];

export default function QueryBuilderComponent({onSaveTemplate, onDeleteTemplate, onClear, onApply, onChange, fields=fieldsExample, title="Constructor de consultas OSP"}) {
  const [query, setQuery] = useState(initialQuery);
  const [templates, setTemplates] = useState([]);
  const [openTemplates, setOpenTemplates] = useState({fast: false, custom: false});
  const [tplName, setTplName] = useState("");

  const TEMPLATES_KEY = "rqb_templates_tailwind_v1";
  useEffect(() => {
    try { const s = localStorage.getItem(TEMPLATES_KEY); setTemplates(s ? JSON.parse(s) : []); } catch {}
  }, []);

  const persistTemplates = (list) => { try { localStorage.setItem(TEMPLATES_KEY, JSON.stringify(list)); } catch {} };
  const saveTemplate = () => {
    const label = (tplName || "").trim() || `Plantilla ${new Date().toLocaleString()}`;
    const id = (globalThis.crypto && globalThis.crypto.randomUUID) ? globalThis.crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
    const list = [...templates, { id, label, query }];
    setTemplates(list); 
    persistTemplates(list); 
    setTplName("");
    onSaveTemplate?.(query);
  };
  const applyTemplate = (t) => setQuery(t.query);

  const deleteTemplate = (id) => { 
    const list = templates.filter(t => t.id !== id); 
    setTemplates(list); 
    persistTemplates(list); 
    onDeleteTemplate?.()
  };

  const handleChangeQuery = (q) => {
    setQuery(q);
    onChange?.(q);
  };

  const hasRules = query.rules?.length > 0;

  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-900   p-1">
        <div className="mx-auto max-w-6xl space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold p-2">{title}</h1>
          </div>

          {/* Presets rápidos */}
          <section className="rounded-md border border-gray-400/70 bg-white  p-4 shadow-sm">
            <button
              type="button"
              onClick={() => setOpenTemplates(prev => ({...prev, fast: !prev.fast}))}
              className="w-full flex items-center gap-2 text-left cursor-pointer"
            >
              {/* Chevron (Right / Down) estilo Radix */}
              <span className="shrink-0">
                {openTemplates.fast ? (
                  <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M3.5 5l4 4 4-4" stroke="currentColor" strokeLinecap="square" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M6 3.5l4 4-4 4" stroke="currentColor" strokeLinecap="square" />
                  </svg>
                )}
              </span>
              <h2 className="text-base font-medium">Plantillas rápidas</h2>
            </button>

            {openTemplates.fast && (
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <TWButton key={p.label} variant="secondary" size="sm" onClick={() => setQuery(p.query)}>➕ {p.label}</TWButton>
                ))}
              </div>
            )}
          </section>

          {/* Mis plantillas */}
          <section className="rounded-md border border-gray-400/70 bg-white p-4 shadow-sm">
            <button
              type="button"
              onClick={() => setOpenTemplates(prev => ({...prev, custom: !prev.custom}))}
              className="w-full flex items-center gap-2 text-left cursor-pointer"
            >
              {/* Chevron (Right / Down) estilo Radix */}
              <span className="shrink-0">
                {openTemplates.custom ? (
                  <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M3.5 5l4 4 4-4" stroke="currentColor" strokeLinecap="square" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M6 3.5l4 4-4 4" stroke="currentColor" strokeLinecap="square" />
                  </svg>
                )}
              </span>
              <h2 className="text-base font-medium">Mis plantillas</h2>
            </button>

            {openTemplates.custom && (
              <div className="mt-4">
                <div className="flex flex-col md:flex-row gap-3 md:items-end">
                  <div className="flex-1">
                    <label className="text-sm">Nombre de la plantilla</label>
                    <TWInput
                      className="mt-1"
                      placeholder="Ej. Clientes VIP Lima"
                      value={tplName}
                      onChange={(e) => setTplName(e.target.value)}
                    />
                  </div>
                  <TWButton onClick={saveTemplate} size="sm" variant='' className="bg-gray-300 cursor-pointer">💾 Guardar actual</TWButton>
                </div>

                <div className="mt-4 grid gap-2">
                  {templates.length === 0 ? (
                    <div className="text-xs opacity-70">Aún no tienes plantillas guardadas.</div>
                  ) : (
                    templates.map((t) => (
                      <div key={t.id} className="flex items-center justify-between rounded-md border border-gray-400/70 p-2 bg-gray-50">
                        <div className="text-sm font-medium">{t.label}</div>
                        <div className="flex gap-2">
                          <TWButton size="sm" variant="secondary" onClick={() => applyTemplate(t)}>Aplicar</TWButton>
                          <TWButton size="sm" variant="ghost" className="text-red-600" onClick={() => deleteTemplate(t.id)}>Eliminar</TWButton>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </section>


          {/* Builder */}
          <section className="rounded-md border border-gray-400/70 bg-white  p-2 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-medium">Constructor de reglas</h2>
              <div className="flex flex-wrap gap-2">
                {query.rules.length === 0 ? (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-700  ">Sin reglas</span>
                ) : (
                  query.rules.map((r, i) => (
                    <span key={i} className="inline-flex items-center rounded-full border border-gray-400/70 px-2 py-1 text-[10px]">{r.field ? `${r.field} ${r.operator} ${String(r.value ?? "")}` : `Grupo (${r.combinator})`}</span>
                  ))
                )}
              </div>
            </div>
              <QueryBuilderDnD
                dnd={{ ...ReactDnD, ...ReactDndHtml5Backend, ...ReactDndTouchBackend }}
              >

                <QueryBuilder
                  fields={fields}
                  query={query}
                  onQueryChange={handleChangeQuery}
                  operators={defaultOperators}
                  controlElements={{
                    fieldSelector: FieldSelector,
                    operatorSelector: OperatorSelector,
                    combinatorSelector: CombinatorSelector,
                    valueEditor: ValueEditor,
                    addRuleAction: AddRuleAction,
                    addGroupAction: AddGroupAction,
                    removeRuleAction: RemoveRuleAction,
                    removeGroupAction: RemoveGroupAction,
                  }}
                  controlClassnames={{ 
                    queryBuilder: "rqb rqb-tailwind queryBuilder-branches"
                  }}
                  showCombinatorsBetweenRules
                  addRuleToNewGroups
                  translations={{
                    fields: "Campos",
                    operators: "Operadores",
                    value: "Valor",
                    removeRule: "Eliminar regla",
                    removeGroup: "Eliminar grupo",
                    addRule: "Agregar regla",
                    addGroup: "Agregar grupo",
                    combinators: { and: "Y", or: "O" },
                    notToggle: "No",
                    notToggleLabel: "Negar",
                    cloneRule: "Duplicar regla",
                    cloneRuleGroup: "Duplicar grupo",
                    dragHandle: "Arrastrar",
                    dropZone: "Zona de soltado",
                    lockRule: "Bloquear regla",
                    lockGroup: "Bloquear grupo",
                  }}
                />
              </QueryBuilderDnD>
              {hasRules && (
                <div className="flex justify-center w-full mt-4">
                
                <TWButton variant="ghost" size="sm" className="text-sky-600" 
                  onClick={() => onApply?.(query)}
                >
                  Ejecutar
                </TWButton>
                <TWButton variant="ghost" size="sm" className="text-red-600" 
                  onClick={() => {
                    onClear?.();
                    setQuery(initialQuery);
                  }} >
                    Limpiar
                </TWButton>
              </div>
              )}
          </section>
        </div>
      </div>
    </div>
  );
}

