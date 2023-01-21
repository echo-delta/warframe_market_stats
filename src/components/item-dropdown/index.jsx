import { useState, useMemo, useEffect } from 'react';
import Select from 'react-dropdown-select';

import Loader from 'src/components/loader';

const ItemDropdown = (props) => {
  const {
    items,
    loading,
    onChange,
  } = props;

  // Keep open until mount. If not, the autofocus will
  // somehow prevent the dropdown from opening automatically.
  const [keepOpen, setKeepOpen] = useState(true);
  const [open, setOpen] = useState(false);

  const itemOptions = useMemo(() => (
    items.map((item) => ({ label: item.item_name, value: item.url_name }))
  ), [items]);
  
  const className = open
    ? 'item-dropdown item-dropdown--open'
    : 'item-dropdown';
  
  const renderNoData = () => (
    <div className="no-data">
      {loading ? 'Loading items...' : 'No data'}
    </div>
  );

  // Clear covers the whole dropdown to make sure field is
  // emptied when user want to change selected value.
  const renderClear = ({ props, state, methods }) => (
    <button
      className="clear"
      onClick={() => methods.clearAll()}
      type="button"
    />
  )

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (values) => {
    if (values.length > 0) {
      onChange(values[0]);
    }
  };

  useEffect(() => {
    setKeepOpen(false);
  }, []);

  return (
    <Select
      autoFocus
      className={className}
      clearable
      clearOnSelect
      clearOnBlur
      clearRenderer={renderClear}
      dropdownGap={0}
      multi={false}
      keepOpen={keepOpen}
      loading={loading}
      loadingRenderer={Loader}
      noDataRenderer={renderNoData}
      onChange={handleChange}
      onDropdownOpen={handleOpen}
      onDropdownClose={handleClose}
      options={itemOptions}
      placeholder="Select item"
      searchable
    />
  );
};

export default ItemDropdown;
