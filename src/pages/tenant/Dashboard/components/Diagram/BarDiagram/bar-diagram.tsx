
import {
  Box,
  IconButton,
  Tooltip,
  Popover,
  Typography,
} from '@mui/material';


import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowsOut, CornersOut, Eraser, FloppyDiskBack, PencilSimple, Polygon, X } from '@phosphor-icons/react';
import { useTenantCode } from '~/utils/hooks/useTenantCode';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardService } from '~/services/dashboard.service';
import ButtonCustom from '~/components/ButtonCustom';
import UploadCropImage from '../components/UploadCropImage';

let newArrMoveFilter;
let existsInBothArrays;
interface BarDiagramProps {
  setShowDiagram?: (value: boolean) => void;
  setPreview?: any
  isDraw?: boolean;
  setDraw?: (value: boolean) => void;
  isEdit?: boolean;
  setEdit?: (value: boolean) => void;
  arrMachine?: any[]; // Replace `any` with the specific type if known
  setArrMachine?: (value: any[]) => void; // Replace `any` with the specific type if known
  dataDiagram?: any; // Replace `any` with the specific type if known
  isRole?: boolean;
  width?: number;
  height?: number;
  setPoints?: (points: any[]) => void; // Replace `any` with the specific type if known
  setPolyComplete?: any;
  setFlattenedPoints?: any; // Replace `any` with the specific type if known
  selected?: any; // Replace `any` with the specific type if known
  setSelected?: (value: any) => void; // Replace `any` with the specific type if known
  arrArea?: any[]; // Replace `any` with the specific type if known
  setArrArea?: (value: any[]) => void; // Replace `any` with the specific type if known
  dataArea?: any; // Replace `any` with the specific type if known
  isMaximize?: boolean;
  extendCard?: any;
  setIsloading?: (value: boolean) => void;
  setCurTypeDevice?: (value: any) => void; // Replace `any` with the specific type if known
  curTypeDevice?: any; // Replace `any` with the specific type if known
  dashboard?: any; // Replace `any` with the specific type if known
}
const EditBar: React.FC<BarDiagramProps> = ({
  isDraw,
  setDraw,
  isEdit,
  setEdit,
  arrMachine,
  setArrMachine,
  dataDiagram,
  isRole,
  width,
  height,
  setPoints,
  selected,
  setSelected,
  arrArea,
  setArrArea,
  isMaximize,
  extendCard,
  setCurTypeDevice,
  curTypeDevice,
  dashboard
}) => {
  const { t } = useTranslation();

  const numberKey = 0;
  const confirmX = 0;
  const confirmY = 0;
  const editArea = arrMachine?.filter((item) => item.type !== 'Area');
  const editPoint = Array.isArray(dataDiagram)
    ? dataDiagram.filter((item) => item?.topLeftPoint?.x === numberKey)
    : [];

  let index = Array.isArray(dataDiagram)
    ? dataDiagram.findIndex(
      (elm) => elm.topLeftPoint?.x === editPoint[0]?.topLeftPoint?.x
    )
    : -1;

  const [newArrMove, setNewArrMove] = useState([]);
  const [showTool, setShowTool] = useState(false);
  const [currentSelected, setCurrentSelected] = useState();
  const { tenantCode } = useTenantCode();
  const queryClient = useQueryClient();
  const createAtributes = useMutation({
    mutationFn: (body: { data: any }) => {
      return dashboardService.saveEntityAttributes(tenantCode, dashboard?.id, body.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAttributesMonitoring'] });
    }
  });

  useEffect(() => {
    if (index > -1) {
      let newArr2;
      if (numberKey && confirmX && confirmY) {
        newArr2 = {
          ...editPoint[0],
          topRightPoint: {
            x: (confirmX + 5) / width,
            y: (confirmY + 13) / height,
          },
        };
        const uniqueSet = [...newArrMove];
        let checkDuplicate = arrMachine.findIndex(
          (element1) => element1.label === newArr2.label
        );
        if (checkDuplicate > -1) {
          uniqueSet[checkDuplicate] = newArr2;
          setNewArrMove(uniqueSet);
        } else {
          setNewArrMove([...newArrMove, newArr2]);
        }
      }
    }
  }, [index, confirmX, confirmY, numberKey, isEdit]);

  useEffect(() => {
    // save normal
    existsInBothArrays = editArea.filter(
      (element1) =>
        !newArrMove.map((element2) => element2?.label).includes(element1?.label)
    );

    // check những thay đổi
    newArrMoveFilter = newArrMove.filter((element1) =>
      dataDiagram.map((element2) => element2?.label).includes(element1?.label)
    );
  }, [editArea, newArrMove]);

  useEffect(() => {
    curTypeDevice && setCurTypeDevice(curTypeDevice);
  }, [curTypeDevice]);



  const handleShowTool = () => {
    setShowTool(true);
    setEdit(true);
    setDraw(false);
  };

  const handleDraw = (value) => {
    setArrMachine(arrMachine);
    setCurrentSelected(value);
    if (currentSelected === value && !isEdit) {
      setSelected(null);
      setEdit(true);
      setDraw(false);
      setPoints([]);
    } else {
      setEdit(false);
      setDraw(true);
      if (value === 1) {
        setSelected(true);
      } else if (value === 2) {
        setSelected(false);
      }
    }
  };

  const handleCancelActionDiagram = () => {
    setShowTool(false);
  };

  const handleError = () => {
    console.log('error');
  };

  const handleSave = async () => {
    // setIsloading(true);
    // save machine
    let arrMachine = [...newArrMoveFilter, ...existsInBothArrays];
    //save Area
    let listArea = [...(arrArea?.length > 0 ? arrArea : [])];
    createAtributes.mutate({
      data: {
        operationData: arrMachine,
        listArea: listArea,
      }
    });
    setDraw(false);
    setEdit(false);
    setShowTool(false);
    setArrMachine(arrMachine);
  };

  //delete all
  const handleConfirmDeleteAll = async () => {
    const arrMachine = [];
    const listArea = [];
    createAtributes.mutate({
      data: {
        operationData: arrMachine,
        listArea: listArea,
      }
    });
    setArrMachine([]);
    setArrArea([]);
    setDraw(false);
    setEdit(false);
    setShowTool(false);
  };
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSaveImageDiagram = (preview: any) => {

    createAtributes.mutate({
      data: {
        operationImage: preview,
      }
    });

  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className="flex">
      {!showTool ? (
        <>

          <Tooltip title={t('edit')} placement="top">
            <IconButton
              onClick={isRole ? handleShowTool : handleError}
              className="btn-ctrl-diagram"
            >
              <PencilSimple size={24} />
            </IconButton>
          </Tooltip>
          <UploadCropImage
            setUploadedFileName={handleSaveImageDiagram}
          />
        </>
      ) : (
        <>
          <Tooltip title={t('draw') + ' zone'} placement="top">
            <IconButton
              onClick={isRole ? () => handleDraw(2) : handleError}
              className={`btn-ctrl-diagram `}
            >
              <div className={
                isDraw && selected === false
                  ? `bg-blue-500 text-white rounded-lg`
                  : ''
              }>
                <Polygon
                  size={24}

                />
              </div>
            </IconButton>
          </Tooltip>
          <div>
            <IconButton aria-describedby={id} onClick={handleClick}>
              <Eraser
                size={24}
                className={'btn-selected'
                }
              />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box p={2}>
                <div className='p-4'>
                  <Typography>Bạn có muốn xóa tất cả zone ?</Typography>
                </div>
                <div className='flex justify-end gap-4'>
                  <ButtonCustom variant='contained' color='secondary' onClick={handleClose}>{t('cancel')}</ButtonCustom>
                  <ButtonCustom variant='contained' onClick={handleConfirmDeleteAll} color="error">
                    Xác nhận
                  </ButtonCustom>

                </div>
              </Box>
            </Popover>
          </div>




          <Tooltip title={t('cancel')} placement="top">
            <IconButton
              onClick={handleCancelActionDiagram}
              className="btn-ctrl-diagram"
            >
              <X size={24} />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('save')} placement="top">
            <IconButton
              onClick={isRole ? handleSave : handleError}
              className="btn-ctrl-diagram"
            >
              <FloppyDiskBack size={24} />
            </IconButton>
          </Tooltip>
        </>
      )}
      {!isMaximize ? (
        <Tooltip title={t('expand')} placement="top" className='hidden'>
          <IconButton
            onClick={extendCard}
            className="btn-ctrl-diagram"
          >
            <CornersOut size={24} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={t('restore')} placement="top" className='hidden'>
          <IconButton
            onClick={extendCard}
            className="btn-ctrl-diagram"
          >
            <ArrowsOut size={24} />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default EditBar;