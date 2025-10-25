import React from 'react';
import '../styles/ControlBars.css';

const ControlsBar = ({
  format,
  onFormatChange,
  pageSize,
  onPageSizeChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="controls-bar">
      <div className="control-group">
        <label htmlFor="format">Formato:</label>
        <select id="format"value={format} onChange={onFormatChange} className="control-select">
          <option value="application/json">JSON</option>
          <option value="application/xml">XML</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="pageSize">Productos por página:</label>
        <select id="pageSize"value={pageSize} onChange={onPageSizeChange} className="control-select">
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="sort">Ordenar por:</label>
        <select id="sort" value={sortBy} onChange={onSortChange} className="control-select">
          <option value="name:asc">Nombre (A-Z)</option>
          <option value="name:desc">Nombre (Z-A)</option>
          <option value="price:asc">Precio (Menor a Mayor)</option>
          <option value="price:desc">Precio (Mayor a Menor)</option>
        </select>
      </div>
    </div>
  );
};

export default ControlsBar;