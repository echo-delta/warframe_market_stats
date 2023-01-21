import { useState, useEffect } from 'react';

import ItemDropdown from 'src/components/item-dropdown';
import styles from 'src/components/pages/dashboard/DashboardPage.module.scss';

const fetchItems = fetch(
  'https://edwintandiono.pythonanywhere.com/wfmarketstats-flask/items',
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
);

const DashboardPage = () => {
  const [items, setItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeItem = (item) => {

  };

  useEffect(() => {
    fetchItems
      .then(async (response) => {
				if (!response.ok && isLoadingItems) {
					setErrorMessage(response.statusText)
          setIsLoadingItems(false);
				}

        const processedResponse = await response.clone().json();

        if (isLoadingItems) {
          console.log('=== DONE', processedResponse)
          setItems(processedResponse);
          setIsLoadingItems(false);
        }
			});
    
    return () => {
      setIsLoadingItems(false);
    }
  }, []);

  console.log('===', items)

  return (
    <div className={styles['dashboard-page']}>
      <ItemDropdown
        items={items}
        loading={isLoadingItems}
        onChange={onChangeItem}
      />
    </div>
  );
};

export default DashboardPage;