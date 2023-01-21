import { useState, useMemo } from 'react';
import Select from 'react-dropdown-select';

import Loader from 'src/components/loader';

const ItemDropdown = (props) => {
  const {
    items,
    loading,
    onChange,
  } = props;

  const [open, setOpen] = useState(false);
  const [hideOptions, setHideOptions] = useState(true);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (values) => {
    if (values.length > 0) {
      onChange(values[0]);
    }
  };

  return (
    <Select
      autoFocus
      className={className}
      clearOnSelect="True"
      clearOnBlur
      dropdownGap={0}
      multi={false}
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
