import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect, useState } from "react";
import {
  getStockOrderProducts,
  selectGetStockOrderProducts,
} from "../slices/get-products.slice";
import { ProductParam } from "features/stock-ordering/core/stock-ordering.params";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";

function not(a: readonly ProductArray[], b: readonly ProductArray[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly ProductArray[], b: readonly ProductArray[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly ProductArray[], b: readonly ProductArray[]) {
  return [...a, ...not(b, a)];
}

interface StockOrderProductSelectorProps {
  setRows: ((rows: OrderTableData[]) => void) | undefined;
  category_id: string;
  selected_store: {
    store_id: string;
    name: string;
  };
}

interface ProductById {
  product_id: string;
  product_name: string;
  uom: string;
  cost: string;
  order_qty: string;
}

interface ProductArray extends Array<ProductById> {}

export function StockOrderProductSelector(
  props: StockOrderProductSelectorProps
) {
  const dispatch = useAppDispatch();
  const getProductInformation = useAppSelector(selectGetStockOrderProducts);

  const [waitingForProducts, setWaitingForProducts] = useState(true);

  const [checked, setChecked] = useState<readonly ProductArray[]>([]);
  const [left, setLeft] = useState<readonly ProductArray[]>([]);
  const [right, setRight] = useState<readonly ProductArray[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    const productParams: ProductParam = {
      category: props.category_id,
      store_information: {
        store_id: props.selected_store.store_id,
        store_name: props.selected_store.name,
      },
    };

    dispatch(getStockOrderProducts(productParams));

    setLeft([]);
    setRight([]);
  }, [dispatch, props.category_id]);

  useEffect(() => {
    if (getProductInformation.data?.products) {
      const leftData: ProductArray[] = getProductInformation.data.products.map(
        (row) => [
          {
            product_id: row.product_id,
            product_name: row.product_name,
            uom: row.uom,
            cost: row.cost,
            order_qty: row.orderQty,
          },
        ]
      );

      setLeft(leftData);
      setWaitingForProducts(false);
    } else {
      setWaitingForProducts(true);
    }
  }, [getProductInformation.data?.products]);

  useEffect(() => {
    const rightProductData: OrderTableData[] = right.flatMap(
      (productArray: ProductArray) =>
        productArray.map((product: ProductById) => ({
          productId: product.product_id,
          productName: product.product_name,
          uom: product.uom,
          cost: product.cost,
          orderQty: product.order_qty,
        }))
    );

    props.setRows?.(rightProductData);
  }, [right]);

  const handleToggle = (value: ProductArray) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly ProductArray[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly ProductArray[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (
    title: React.ReactNode,
    items: readonly ProductArray[]
  ) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />

      {waitingForProducts ? (
        <div className="flex flex-col space-y-1 px-1">
          <Skeleton width={350} height={30} animation="wave" />
          <Skeleton width={350} height={30} animation="wave" />
          <Skeleton width={350} height={30} animation="wave" />
          <Skeleton width={350} height={30} animation="wave" />
        </div>
      ) : (
        <List
          sx={{
            width: 350,
            height: 230,
            bgcolor: "background.paper",
            overflow: "auto",
          }}
          dense
          component="div"
          role="list"
        >
          {items.map((value: ProductArray, index: number) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <>
                <ListItemButton
                  key={index}
                  role="listitem"
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={value.map((row) => row.product_name)}
                  />
                </ListItemButton>
                <Divider variant="middle" />
              </>
            );
          })}
        </List>
      )}
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList("Products", left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList("Added Products", right)}</Grid>
    </Grid>
  );
}
