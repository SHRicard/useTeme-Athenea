import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '../icons';
import { Label } from '../labels';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisibleButtons = 3;

    pages.push(
      <TouchableOpacity
        key={1}
        style={[styles.pageButton, currentPage === 1 && styles.activePageButton]}
        onPress={() => {
          onPageChange?.(1);
        }}
      >
        <Label
          text="1"
          type="primary"
          size={14}
          color={currentPage === 1 ? '#FFFFFF' : '#1B4B66'}
        />
      </TouchableOpacity>
    );

    let leftBound = Math.max(2, currentPage - Math.floor(maxVisibleButtons / 2));
    let rightBound = Math.min(totalPages - 1, leftBound + maxVisibleButtons - 1);

    if (rightBound === totalPages - 1) {
      leftBound = Math.max(2, rightBound - maxVisibleButtons + 1);
    }

    if (leftBound > 2) {
      pages.push(<Label key="dots1" text="..." type="primary" size={14} color="#1B4B66" />);
    }

    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          style={[styles.pageButton, currentPage === i && styles.activePageButton]}
          onPress={() => {
            onPageChange?.(i);
          }}
        >
          <Label
            text={i.toString()}
            type="primary"
            size={14}
            color={currentPage === i ? '#FFFFFF' : '#1B4B66'}
          />
        </TouchableOpacity>
      );
    }

    if (rightBound < totalPages - 1) {
      pages.push(<Label key="dots2" text="..." type="primary" size={14} color="#1B4B66" />);
    }

    if (totalPages > 1) {
      pages.push(
        <TouchableOpacity
          key={totalPages}
          style={[styles.pageButton, currentPage === totalPages && styles.activePageButton]}
          onPress={() => {
            onPageChange?.(totalPages);
          }}
        >
          <Label
            text={totalPages.toString()}
            type="primary"
            size={14}
            color={currentPage === totalPages ? '#FFFFFF' : '#1B4B66'}
          />
        </TouchableOpacity>
      );
    }

    return pages;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => {
          onPageChange?.(1);
        }}
        disabled={currentPage <= 1}
      >
        <FontAwesomeIcon
          name="angle-left"
          size={24}
          color={currentPage <= 1 ? '#CCCCCC' : '#1B4B66'}
        />
      </TouchableOpacity>

      <View style={styles.pageNumbersContainer}>
        {renderPageNumbers()}
      </View>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => {
          onPageChange?.(totalPages);
        }}
        disabled={currentPage >= totalPages}
      >
        <FontAwesomeIcon
          name="angle-right"
          size={24}
          color={currentPage >= totalPages ? '#CCCCCC' : '#1B4B66'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  arrowButton: {
    padding: 8,
  },
  pageButton: {
    minWidth: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1B4B66',
    marginHorizontal: 4,
  },
  activePageButton: {
    backgroundColor: '#1B4B66',
    borderColor: '#1B4B66',
  },
}); 