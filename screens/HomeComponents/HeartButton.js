import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/GlobalStyles';

function HeartButton() {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
      <MaterialCommunityIcons
        name={liked ? 'heart' : 'heart-outline'}
        size={32}
        color={liked ? colors.darkGreen : 'black'}
      />
    </Pressable>
  );
}

export default HeartButton;
