package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.comment.CommentDto;
import com.Kosten.Api_Rest.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentMapper {

    @Mapping(target = "user", ignore = true)
    Comment toEntity(CommentDto commentDto);

    @Mapping(source = "user.id", target = "userId")
    CommentDto toDto(Comment comment);

    List<CommentDto> entityListToDtoList(List<Comment> commentList);

    List<Comment> dtoListToEntityList(List<CommentDto> commentDtoList);
}
