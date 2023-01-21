import { useState, useMemo } from 'react';
import Select from 'react-dropdown-select';

import styles from 'src/components/pages/dashboard/DashboardPage.module.scss';

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

  const getClassName = () => {
    let className = 'item-dropdown';

    if (hideOptions) {
      className += ' item-dropdown--hide-options';
    } else if (open) {
      className += ' item-dropdown--open';
    }

    return className;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = ({ state, methods }) => {
    console.log('===', state, methods)
    if (!state.search) {
      setHideOptions(true);
      return [];
    }

    setHideOptions(false);

    const regexp = new RegExp(methods.safeString(state.search), 'i');

    return methods
      .sortBy()
      .filter((item) => regexp.test(item.label));
  };

  const handleChange = (values) => {
    if (values) {
      onChange(values);
    }
  };

  return (
    <form>
      <Select
        autoFocus
        className={getClassName()}
        dropdownGap={0}
        multi={false}
        loading={loading}
        onChange={handleChange}
        onDropdownOpen={handleOpen}
        onDropdownClose={handleClose}
        options={itemOptions}
        placeholder="Select item"
        searchable
        searchFn={handleSearch}
      />
    </form>
  );
};

export default ItemDropdown;
