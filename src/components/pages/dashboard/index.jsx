import { useState, useEffect } from 'react';

import Loader from 'src/components/loader';
import ItemDropdown from 'src/components/item-dropdown';
import ItemDetail from 'src/components/item-detail';
import styles from 'src/components/pages/dashboard/DashboardPage.module.scss';

const fetchItems = () => fetch(
  'https://edwintandiono.pythonanywhere.com/wfmarketstats-flask/items',
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
);

const fetchItemDetail = (itemUrl) => fetch(
  `https://edwintandiono.pythonanywhere.com/wfmarketstats-flask/items/${itemUrl}`,
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
);

const DashboardPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const [items, setItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);

  const [itemDetail, setItemDetail] = useState({});
  const [isLoadingItemDetail, setIsLoadingItemDetail] = useState(false);

  const handleSelectItem = async (item) => {
    setItemDetail({
      item_name: item.label,
      url_name: item.value,
    });
    setIsLoadingItemDetail(true);
  };

  // On mount, fetch items.
  // On unmount, mark all loading to false to prevent
  // state update on unmounted components.
  useEffect(() => {
    fetchItems()
      .then(async (response) => {
				if (!response.ok && isLoadingItems) {
					setErrorMessage(response.statusText)
				} else {
          const processedResponse = await response.clone().json();

          if (isLoadingItems) {
            setItems(processedResponse);
          }
        }
			})
      .finally(() => {
        if (isLoadingItems) {
          setIsLoadingItems(false);
        }
      });
    
    return () => {
      setIsLoadingItems(false);
      setIsLoadingItemDetail(false);
    }
  }, []);

  // On item selected, fetch item details.
  useEffect(() => {
    if (itemDetail.url_name) {
      fetchItemDetail(itemDetail.url_name)
        .then((response) => response.clone().json())
        .then((response) => {
          if (isLoadingItemDetail) {
            setItemDetail((prevState) => ({
              ...prevState,
              ...response,
            }));
          }
        })
        .finally(() => {
          if (isLoadingItemDetail) {
            setIsLoadingItemDetail(false);
          }
        });
    }
  }, [itemDetail.url_name]);

  return (
    <div className={styles['dashboard-page']}>
      <ItemDropdown
        disabled
        items={items}
        loading={isLoadingItems}
        onChange={handleSelectItem}
      />
      <ItemDetail
        itemDetail={itemDetail}
        loading={isLoadingItemDetail}
      />
    </div>
  );
};

export default DashboardPage;