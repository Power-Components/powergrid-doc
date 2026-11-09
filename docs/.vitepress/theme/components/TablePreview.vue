<script setup>
// HTML mock of a PowerGrid 7 table (Tailwind theme): tabs, header controls, active filter, rows, pagination.
// Stays current with the docs and theme, unlike a screenshot.
const tabs = [
    { label: 'All', badge: 48, active: true },
    { label: 'In stock', badge: 41 },
    { label: 'Sold out', badge: 7 },
]
const rows = [
    { name: 'Pastel de Nata', category: 'Dessert', price: '$ 2.50', stock: true },
    { name: 'Feijoada', category: 'Main dish', price: '$ 14.90', stock: true },
    { name: 'Pão de Queijo', category: 'Snack', price: '$ 3.20', stock: false },
    { name: 'Moqueca', category: 'Main dish', price: '$ 18.00', stock: true },
    { name: 'Brigadeiro', category: 'Dessert', price: '$ 1.10', stock: true },
]
</script>

<template>
    <figure class="table-preview" role="img" aria-label="PowerGrid table with tabs, header controls, an active filter, five rows and pagination">
        <div aria-hidden="true">
            <div class="tp-tabs">
                <span v-for="tab in tabs" :key="tab.label" :class="{ on: tab.active }">
                    {{ tab.label }} <small>{{ tab.badge }}</small>
                </span>
            </div>
            <div class="tp-card">
                <div class="tp-header">
                    <span class="tp-btn tp-primary tp-hide">New dish</span>
                    <div class="tp-controls">
                        <span class="tp-btn tp-icon tp-hide" title="Columns">
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18" /></svg>
                        </span>
                        <span class="tp-btn tp-icon" title="Export">
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></svg>
                        </span>
                        <span class="tp-btn tp-icon tp-filter" title="Filters">
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></svg>
                            <i>1</i>
                        </span>
                        <div class="tp-search">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                            <span>Search...</span>
                        </div>
                    </div>
                </div>
                <div class="tp-chips">
                    <span>Price: <b>&lt; $ 20</b> &times;</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th class="tp-check"><i></i></th>
                            <th>Name <span class="tp-sort">&#8593;</span></th>
                            <th class="tp-hide">Category</th>
                            <th class="tp-num">Price</th>
                            <th>Stock</th>
                            <th class="tp-act"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in rows" :key="row.name">
                            <td class="tp-check"><i :class="{ on: i === 1 }"></i></td>
                            <td>{{ row.name }}</td>
                            <td class="tp-hide">{{ row.category }}</td>
                            <td class="tp-num">{{ row.price }}</td>
                            <td><span class="tp-toggle" :class="{ on: row.stock }"></span></td>
                            <td class="tp-act"><span class="tp-btn tp-sm">Edit</span></td>
                        </tr>
                    </tbody>
                </table>
                <div class="tp-footer">
                    <span><span class="tp-hide">Showing</span> 1 to 5 of 48 <span class="tp-hide">Results</span></span>
                    <div class="tp-pages">
                        <span>&lsaquo;</span><b>1</b><span>2</span><span>3</span><span>&rsaquo;</span>
                    </div>
                </div>
            </div>
        </div>
    </figure>
</template>

<style scoped>
.table-preview {
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    text-align: left;
    font-family: var(--vp-font-family-base);
    font-size: 13px;
    color: var(--vp-c-text-1);
    /* hide secondary parts when the mock itself is narrow (hero column or phone) */
    container-type: inline-size;
}
.vp-doc .table-preview {
    margin: 24px 0;
    max-width: 580px;
}

/* ---------- Tabs (segmented, like themes/tailwind/tabs.blade.php) ---------- */
.tp-tabs {
    display: inline-flex;
    gap: 4px;
    margin-bottom: 10px;
    padding: 4px;
    border-radius: 12px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
}
.tp-tabs span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 8px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    white-space: nowrap;
}
.tp-tabs span.on {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}
.tp-tabs small {
    padding: 0 7px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
}
.tp-tabs span.on small {
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}

/* ---------- Card + header ---------- */
.tp-card {
    position: relative;
    border-radius: 12px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
    box-shadow: 0 24px 60px -16px rgba(0, 0, 0, 0.25);
    overflow: hidden;
}
.tp-header {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 12px 12px 8px;
}
.tp-controls {
    flex: 1;
    min-width: 0;
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: flex-end;
}
.tp-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 30px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
    color: var(--vp-c-text-2);
    font-weight: 500;
    white-space: nowrap;
}
.tp-primary {
    background: var(--vp-button-brand-bg);
    border-color: transparent;
    color: var(--vp-button-brand-text);
}
.tp-icon {
    width: 30px;
    padding: 0;
}
.tp-filter {
    position: relative;
    color: var(--vp-c-brand-1);
}
.tp-filter i {
    position: absolute;
    /* sits on the corner, clear of the icon; ring in card color separates it from the border */
    top: -8px;
    right: -8px;
    min-width: 14px;
    height: 14px;
    border-radius: 999px;
    background: var(--vp-c-brand-3);
    box-shadow: 0 0 0 2px var(--vp-c-bg);
    color: #14171d;
    font-size: 9px;
    line-height: 1;
    font-style: normal;
    font-weight: 700;
    display: grid;
    place-items: center;
}
.tp-search {
    flex: 1;
    min-width: 0;
    max-width: 220px;
    display: flex;
    align-items: center;
    gap: 6px;
    height: 30px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-3);
    white-space: nowrap;
    overflow: hidden;
}
.tp-chips {
    display: flex;
    gap: 6px;
    padding: 0 12px 10px;
    border-bottom: 1px solid var(--vp-c-divider);
}
.tp-chips span {
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 12px;
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-text-2);
}
.tp-chips b {
    font-weight: 500;
    color: var(--vp-c-text-1);
}

/* ---------- Table (.tp-card prefix beats .vp-doc table styles inside pages) ---------- */
.tp-card table {
    display: table;
    width: 100%;
    margin: 0;
    border: 0;
    border-radius: 0;
    border-collapse: collapse;
    font-size: 13px;
    line-height: 1.4;
}
.tp-card tr {
    background: transparent;
    border: 0;
}
.tp-card th,
.tp-card td {
    border: 0;
    padding: 9px 12px;
    border-bottom: 1px solid var(--vp-c-divider);
    text-align: left;
    white-space: nowrap;
}
.tp-card th {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--vp-c-text-2);
    background: var(--vp-c-bg-alt);
}
.tp-sort {
    color: var(--vp-c-brand-1);
}
.tp-card .tp-num {
    text-align: right;
    font-family: var(--vp-font-family-mono);
    font-size: 12px;
}
.tp-card .tp-check {
    width: 1px;
    padding-right: 0;
}
.tp-check i {
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 4px;
    border: 1px solid var(--vp-c-text-3);
}
.tp-check i.on {
    border-color: var(--vp-c-brand-3);
    background: var(--vp-c-brand-3)
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2314171d' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12l5 5L20 7'/%3E%3C/svg%3E")
        center / 10px no-repeat;
}
.tp-card tbody tr:nth-child(2) {
    background: var(--vp-c-brand-soft);
}
.tp-toggle {
    display: inline-block;
    position: relative;
    width: 28px;
    height: 16px;
    border-radius: 999px;
    background: var(--vp-c-divider);
    vertical-align: middle;
}
.tp-toggle::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
}
.tp-toggle.on {
    background: #16a34a;
}
.tp-toggle.on::after {
    left: 14px;
}
.tp-sm {
    height: 24px;
    padding: 0 8px;
    font-size: 12px;
}

/* ---------- Footer ---------- */
.tp-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    color: var(--vp-c-text-2);
    font-size: 12px;
}
.tp-pages {
    display: flex;
    gap: 4px;
}
.tp-pages span,
.tp-pages b {
    min-width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    border-radius: 6px;
    border: 1px solid var(--vp-c-divider);
}
.tp-pages b {
    border-color: var(--vp-c-brand-3);
    color: var(--vp-c-brand-1);
    font-weight: 600;
}

@container (max-width: 440px) {
    .tp-hide {
        display: none;
    }
    .tp-search {
        max-width: none;
    }
}
@container (max-width: 360px) {
    .tp-act {
        display: none;
    }
}
</style>
