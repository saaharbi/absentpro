import { Search, Filter, X } from 'lucide-react';
import '../styles/SearchFilter.css';

interface SearchFilterProps {
  onSearchChange: (query: string) => void;
  onSectionChange: (section: string) => void;
  onStatusChange: (status: string) => void;
  onDateChange: (date: string) => void;
  sections: string[];
  showDateFilter?: boolean;
}

function SearchFilter({
  onSearchChange,
  onSectionChange,
  onStatusChange,
  onDateChange,
  sections,
  showDateFilter = false,
}: SearchFilterProps) {
  const handleClear = () => {
    onSearchChange('');
    onSectionChange('');
    onStatusChange('');
    onDateChange('');
  };

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="🔍 ابحث عن طالب..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filters">
        <div className="filter-group">
          <Filter size={18} />
          <select
            onChange={(e) => onSectionChange(e.target.value)}
            className="filter-select"
          >
            <option value="">الكل - الفصول</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            onChange={(e) => onStatusChange(e.target.value)}
            className="filter-select"
          >
            <option value="">الكل - الحالة</option>
            <option value="حاضر">✅ حاضر</option>
            <option value="غائب">❌ غائب</option>
            <option value="متأخر">⏱️ متأخر</option>
            <option value="لم يتم">⚪ لم يتم</option>
          </select>
        </div>

        {showDateFilter && (
          <div className="filter-group">
            <input
              type="date"
              onChange={(e) => onDateChange(e.target.value)}
              className="filter-select"
            />
          </div>
        )}

        <button
          onClick={handleClear}
          className="clear-button"
          title="مسح جميع الفلاترة"
        >
          <X size={18} />
          مسح
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;
