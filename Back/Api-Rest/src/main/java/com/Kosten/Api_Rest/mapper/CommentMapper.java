package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.comment.*;
import com.Kosten.Api_Rest.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {UserMapper.class})
public interface CommentMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "packageRef", ignore = true)
    Comment toEntity(CommentDto commentDto);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "packageRef", ignore = true)
    Comment toEntity(CommentRequestDto commentRequestDto);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "packageRef.id", target = "packageId")
    CommentDto toDto(Comment comment);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(target = "username", expression = "java(comment.getUser() != null ? comment.getUser().getName() : null)")
    @Mapping(source = "packageRef.id", target = "packageId")
    CommentDtoResponse toDto1(Comment comment);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(target = "username", expression = "java(comment.getUser() != null ? comment.getUser().getName() : null)")
    @Mapping(source = "packageRef.id", target = "packageId")
    @Mapping(source = "packageRef.name", target = "name")
    CommentDtoResponse2 toDto2(Comment comment);

    @Mapping(source = "comment", target = "commentDto")
    @Mapping(source = "packageRef.name", target = "name")
    CPackageResponse toCPackageResponse(Comment comment);

    List<CommentDto> entityListToDtoList(List<Comment> commentList);

    List<Comment> dtoListToEntityList(List<CommentDto> commentDtoList);

    List<CommentDtoResponse> entityListToDtoList1(List<Comment> commentList1);

    List<CommentDtoResponse2> entityListToDtoList2(List<Comment> commentList2);

    default PackageCResponse toPackageCResponse(List<Comment> commentList) {
        return new PackageCResponse(entityListToDtoList1(commentList));
    }

}